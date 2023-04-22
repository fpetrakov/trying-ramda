import { compose, take, filter, whereEq } from 'ramda'

const tasks = [
	{ complete: true, text: 'buy milk' },
	{ complete: false, text: 'clean my room' },
	{ complete: false, text: 'clean the kitchen' },
	{ complete: true, text: 'do smth' },
	{ complete: false, text: 'not do smth' },
]

const incomplete = filter(whereEq({ complete: false }))
const twoIncomplete = compose(take(2), incomplete)
console.log(twoIncomplete(tasks))
