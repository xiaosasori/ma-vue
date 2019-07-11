<template>
  <section>
    <h1>vue-rx</h1>
    <p>{{interval$}}</p>
    <button v-stream:click="click$">Click</button>
    <div v-if="luke$">
      <p>{{name$}}</p>
      <img :src="image$" alt="img">
      <img :src="`https://starwars.egghead.training/${luke$.image}`" alt="img">
    </div>
    <h3>mapClick: {{mapClick$}}</h3>
    <h3>mapLuke: {{mapLuke$}}</h3>
    <h3>disabled: {{disabled$}}</h3>
  </section>
</template>

<script>
import { interval, from, merge } from "rxjs";
import { map, pluck, switchMap, share, mapTo, startWith, exhaustMap } from "rxjs/operators";
export default {
  domStreams: ["click$"],
  subscriptions() {
    // const person$ = from(
    //     this.axios.get("https://starwars.egghead.training/people/1")
    // ).pipe(pluck("data"));
    // const luke$ = this.click$.pipe(switchMap(() => person$), share());
    const createLoader = url => from(this.axios.get(url)).pipe(pluck('data'))
    const luke$ = this.click$.pipe(mapTo('https://starwars.egghead.training/people/1'),
      exhaustMap(createLoader),share());
    const name$ = luke$.pipe(pluck('name'))
    const image$ = luke$.pipe(
      pluck("image"),
      map(img => `https://starwars.egghead.training/${img}`)
    );
    const mapClick$ = this.click$.pipe(mapTo(true))
    const mapLuke$ = luke$.pipe(mapTo(false))
    const disabled$ = merge(
      mapClick$,
      mapLuke$
    ).pipe(startWith(false));

    return {
      interval$: interval(1000),
      luke$,
      name$,
      image$,
      mapClick$,
      mapLuke$,
      disabled$
    };
  }
};
</script>

<style>
</style>
