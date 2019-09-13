import * as types from './mutation-types'

export default function factory (listName = 'items') {
// Store selected count and selection state of individual item
let model = new WeakMap()

const state = {
  // For UI, whether the UI is in selection mode or not
  uiEnabled: false,
  // Changes emitter, due to state.model will not be reactive
  _synchronizer: false
}
/** Announce Vue that all getters that depends on the synchronizer might have their value changed */
function synchronize (state) {
  state._synchronizer = !state._synchronizer
}
/** Call inside getters to announce to Vue that their value may be changed if the synchronizer changed */
function dependsSynchronizer (state) {
  state._synchronizer = !!state._synchronizer
}

const getters_ = {
  selectedCount (state, getters) {
    dependsSynchronizer(state)
    return getters.parentList ? getters.parentList.filter((item) => model.get(item)).length : []
  },
  isSelected (state, getters) {
    dependsSynchronizer(state)
    return (item) => {
      if (item === getters.parentList) {
        // Selection state of the list is true if and only if all items are selected
        return getters.isSomeSelected
      } else {
        return !!model.get(item)
      }
    }
  },
  isSomeSelected (state, getters) {
    return getters.selectedCount
  },
  isPartialSelected (state, getters) {
    const currentSelectedCount = getters.selectedCount
    return currentSelectedCount !== (getters.parentList ? getters.parentList.length && currentSelectedCount !== 0 : false)
  },
  selectedItems (state, getters) {
    dependsSynchronizer(state)
    return getters.parentList ? getters.parentList.filter((item) => !!model.get(item)) : []
  },
  parentList (state, getters, rootState) {
    for (const rootKey in rootState) {
      if (Object.prototype.hasOwnProperty.call(rootState, rootKey) && rootState[rootKey] === state) {
        return rootState[listName] || []
      }
      for (const level2Key in rootState[rootKey]) {
        if (Object.prototype.hasOwnProperty.call(rootState[rootKey], level2Key) && rootState[rootKey][level2Key] === state) {
          return rootState[rootKey][listName] || []
        }
      }
    }
    return []
  }
}

const mutations = {
  [types.UPDATE_SELECTION_STATE] (state, {item, selectionState}) {
    // Update the selection state of list item, either true or false
    model.set(item, selectionState)

    // Announce change
    synchronize(state)
  },
  [types.UPDATE_SELECTION_UI] (state, enableState) {
    // Return early if no change
    if (state.uiEnabled === !!enableState) { return }

    // Set new state and also reset the model
    state.uiEnabled = !!enableState
    model = new WeakMap()
  }
}

const actions = {
  updateSelectionState ({commit, getters}, {item, selectionState}) {
    const items = item !== getters.parentList ? [item] : getters.parentList
    items.forEach(item => {
      commit(types.UPDATE_SELECTION_STATE, {item, selectionState})
    })
  }
}

return {state, getters: getters_, mutations, actions}
}
