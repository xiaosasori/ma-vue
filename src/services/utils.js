// import parse from 'parse-link-header'
// import dayjs from 'dayjs'
// import {updateField as _updateField} from 'vuex-map-fields'
import _ from 'lodash'
// import arrayToObject from 'vuex-map-fields/src/lib/array-to-object'
// import VProgressCircular from 'vuetify/lib/components/VProgressCircular'

export function convertLinkHeaderToPagination (linkHeader) {
  const parsedLink = parse(linkHeader)
  let currentPage, totalPages, perPage

  // Get current page from next or prev link, whichever is available
  if (parsedLink.next) {
    currentPage = parseInt(parsedLink.next.page) - 1
    perPage = parsedLink.next.per_page
  } else if (parsedLink.prev) {
    currentPage = parseInt(parsedLink.prev.page || 1) + 1
    perPage = parsedLink.prev.per_page
  }

  // Get total pages from last link or prev link, whichever is available
  if (parsedLink.last) {
    totalPages = parseInt(parsedLink.last.page)
    perPage = parsedLink.last.per_page
  } else if (parsedLink.prev) {
    totalPages = parseInt(parsedLink.prev.page || 1) + 1
    perPage = parsedLink.prev.per_page
  }

  return {currentPage, totalPages, ...(perPage ? {perPage: parseInt(perPage)} : {})}
}

export function updateFieldFactory (path) {
  return function (state, value) {
    return _updateField(state, {path, value})
  }
}

export function updateFieldsFactory (prefix = '') {
  return function (state, payload) {
    _.forOwn(payload, (value, key) => {
      const path = prefix ? `${prefix}.${key}` : key
      _updateField(state, {path, value})
    })
  }
}

/**
 * Only resolve a promise after at least an amount of time
 *
 * Useful for when showing a progress indicator for a request but don't
 * want the indicator to be back to hidden too fast
 * @param {number} time
 * @param {Promise} promise
 * @returns {Promise<any[] | never>}
 */
export function delayPromise (time, promise) {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, time))
  ]).then(() => promise)
}

/**
 * Better named, function alias of delayPromise
 * @param promise
 * @param time
 * @returns {Promise<any[]|never>}
 */
export function avoidTooFastAnimation (promise, time = 1500) {
  return delayPromise(time, promise)
}

class ChangeTracker {
  constructor () {
    this._store = new WeakMap()
  }

  track (object) {
    // Clone the object
    const clone = _.cloneDeep(object)
    // Store it
    this._store.set(object, clone)
  }

  getOriginal (object) {
    // Access everything so if this function is used inside a
    // computed property, Vue will refresh the computed value
    // when object changes
    for (const prop in object) {
      // eslint-disable-next-line no-unused-vars
      const __ = object[prop]
    }
    return this._store.get(object)
  }

  changedProps (object) {
    const clone = this.getOriginal(object)
    if (clone === undefined) {
      throw new Error('This object was not tracked. Call objectTracker.track(object) first.')
    }
    const props = []
    for (const prop in object) {
      if (!_.isEqual(object[prop], clone[prop])) {
        props.push(prop)
      }
    }
    return props
  }

  changed (object) {
    return _.pick(object, this.changedProps(object))
  }

  /**
   * Mark a property as unchanged by copying value back to original object
   * @param {object} object
   * @param {string} prop
   */
  setUnchanged (object, prop) {
    const original = this.getOriginal(object)
    original[prop] = object[prop]
  }
}

export const changeTracker = new ChangeTracker()

export function utcISOToLocalDate (utc) {
  // Convert ISO8601 UTC(server format) to local timezone
  const parsed = dayjs(utc)
  if (parsed.isValid()) {
    return parsed.format('YYYY-MM-DD')
  } else {
    return ''
  }
}

export function localDateToUtcISO (local) {
  // Convert local timezone to ISO8601 UTC(server format)
  return dayjs(local).toISOString()
}

/**
 * An modified version of mapFields from vuex-map-fields that allow
 * specifying a part of the key as dynamic, using template string syntax.
 * The context for evaluation will be the Vue instance.
 *
 * E.g:
 * export default {
 *     props: {
 *         index: {type: Number}
 *     },
 *     computed: {
 *         ...mapDynamicFields(namespace, ['panels.${index}.title'])
 *     }
 * }
 *
 * @param namespace
 * @param fields
 * @returns {{}}
 */
export function mapDynamicFields (namespace, fields) {
  const fieldsObject = arrayToObject(fields)

  return Object.keys(fieldsObject).reduce((prev, key) => {
    const path = _.template(fieldsObject[key])

    // eslint-disable-next-line no-param-reassign
    prev[key] = {
      get () {
        return this.$store.getters[`${namespace}/getField`](path(this))
      },
      set (value) {
        this.$store.commit(`${namespace}/updateField`, {path: path(this), value})
      }
    }

    return prev
  }, {})
}

/**
 * A modified version of updateField from vuex-map-fields that allow updating multiple
 * keys at once.
 * @param state The Vuex state
 * @param payload
 */
export function updateField (state, payload) {
  if (payload.path !== undefined && payload.value !== undefined) {
    _updateField(state, payload)
  } else {
    Object.keys(payload).forEach(path => {
      const value = payload[path]
      _updateField(state, {path, value})
    })
  }
}

// Re-export getField in this file for convenience when importing
// export {getField} from 'vuex-map-fields'

/**
 * Utility function to support lazy loading route component with nice loading indicator when
 * the component is taking some time to load
 * @param {Promise} AsyncView
 * @returns {Promise<{functional: boolean, render(*, {data?: *, children?: *}): *}>|*}
 */
export function loadRoute (AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: {
      functional: true,
      render () {
        return (<VProgressCircular
          class="mx-auto mt-12 d-block" color="grey" size={64}
          indeterminate={true} />)
      }
    }
  })

  return Promise.resolve({
    functional: true,
    render (h, {data, children}) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    }
  })
}
