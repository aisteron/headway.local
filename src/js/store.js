
let initState = { step: 1 }


class Store {
	constructor(updateState, state) {
		this._updateState = updateState;
		this._state = state;
		this._callbacks = [];
	}
	get state() {
		return this._state
	}
	update(state) {
		this._state = this._updateState(state);
		this._callbacks.forEach(callback => callback())
	}
	subscribe(callback){
		this._callbacks.push(callback)
	}
}

export const store = new Store(updateState, initState);

function updateState(state) { return Object.assign({}, state, { step: state.step }) }

//store.subscribe( () => initListeners(store.state) )