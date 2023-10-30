interface IHasKey {
	getKey(): Key;
}

interface IDoor {
	openDoor(key: Key): void;
}

class Key {
	private signature: number;

	constructor() {
		this.signature = Math.random();
	}
	getSignature() {
		return this.signature;
	}
}

class Person implements IHasKey {
	private key: Key;

	constructor(key: Key) {
		this.key = key;
	}

	getKey() {
		return this.key;
	}
}

abstract class House implements IDoor {
	protected door: boolean = false;
	protected key: Key;
	protected tenants: Person[] = [];

	constructor(key: Key) {
		this.key = key;
	}

	abstract openDoor(key: Key): void;

	comeIn(person: Person): void {
		if (this.door) {
			this.tenants.push(person);
			console.log("Person is in the house.");
		} else {
			console.log("Door is closed. Cannot enter.");
		}
	}
}

class MyHouse extends House {
	openDoor(key: Key): void {
		if (key.getSignature() === this.key.getSignature()) {
			this.door = true;
			console.log("Door is opened.");
		} else {
			console.log("Cannot open the door. Invalid key.");
		}
	}
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
