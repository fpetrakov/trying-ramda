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
	multiply,
	inc,
	dec,
	negate,
	defaultTo,
	cond,
	equals,
	always,
	T,
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
twoIncomplete(tasks)

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
const mySquare = (a: number) => a * a
const squaredSum = pipe(sum, mySquare)
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

// Arithmetics
const square = (x: number) => multiply(x, x)
const operate = pipe(negate, dec, inc, square)

// Logic
const settings: { lineWidth?: number } = {}
// checks if the second argument null or undefined
const lineWidth = defaultTo(80, settings.lineWidth)

const water = temperature =>
	cond([
		[equals(0), always('water freezes at 0 C')],
		[equals(100), always('water boils at 100 C')],
		[T, temp => `nothing special happens at ${temp} C`],
	])(temperature)

water(100) // water boils at 100 C
