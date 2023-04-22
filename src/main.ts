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
	prop,
	gte,
	pick,
	has,
	path,
	propOr,
	keys,
	values,
	assoc,
	evolve,
	mergeAll,
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

const water = (temperature: number) =>
	cond([
		[equals(0), always('water freezes at 0 C')],
		[equals(100), always('water boils at 100 C')],
		[T, temp => `nothing special happens at ${temp} C`],
	])(temperature)

water(100) // water boils at 100 C

/*  
/* Immutability and Objects
*/

type Person = {
	birthCountry: string
	naturalizationDate: string
	age: number
}

const OUR_COUNTRY = 'Russia'
const wasBornInCountry = compose(equals(OUR_COUNTRY), prop('birthCountry'))
const wasNaturalized = compose(Boolean, prop('naturalizationDate'))
const isOver18 = compose(gte(__, 18), prop('age'))

const pers = {
	name: 'pers',
	age: 21,
	address: {
		city: 'Kaluga',
	},
}

const nameAndAge = pick(['name', 'age'])
nameAndAge(pers) // {name: 'pers', age: 21}

const hasName = has('name')

// returns undefined if not found while prop raises an error
const city = path(['address', 'city'], pers) // 'Kaluga'

const height = propOr(200, 'height')(pers)
console.log(height)
keys(pers)
values(pers)

// updating and removing props

const newObj = assoc('name', 'somebody', pers)
// evolve can't add new props
const celebrateBirthday = evolve({ age: inc }) // returns new object
const twentytwo = celebrateBirthday(newObj)

const a = { a: 10 }
const b = { b: 20 }
const c = mergeAll([a, b]) // {a: 10, b: 20}


/*  
/* Immutability and Arrays
*/