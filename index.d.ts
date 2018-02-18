declare module 'lape' {
    import { Evolver } from 'ramda'

    export default function <StateInterface>(defaultState: StateInterface): {
        state: StateInterface,
        evolveState: (transformations:Evolver<StateInterface>) => void,
        listen: (callback:(state:StateInterface) => void) => () => void,
    }
}