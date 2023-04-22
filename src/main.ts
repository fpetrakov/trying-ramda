import {
	compose,
	take,
	filter,
	whereEq,
	find,
	complement,
	both,
	either,
	pipe,
	flip,
	curry,
	__,
} from 'ramda'

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

// Simple combinators

// Complement
const isEven = (x: number) => x % 2 === 0
find(complement(isEven), [1, 2, 3, 4]) // 1

// Both / Either
const isFour = (x: number) => x === 4
find(both(isEven, isFour))([1, 2, 4, 5, 6]) // 4
find(either(isEven, isFour))([1, 2, 4, 5, 6]) // 2

// Pipe
const sum = (a: number, b: number) => a + b
const square = (a: number) => a * a
const squaredSum = pipe(sum, square)
squaredSum(2, 2) // 16

// Partial application

// Flip
const ownMap = <T, K>(array: Array<T>, fn: (arg: T) => K) => array.map(fn)
const flipped = flip(ownMap)
flipped(v => v * 2, [1, 2, 3]) // order of arguments changed, so it's easier to compose

// Placeholder
const threeArgs = curry((a, b, c) => a + b + c)
const middleArgumentLater = threeArgs(1, __, 3)
middleArgumentLater(10) // 14
