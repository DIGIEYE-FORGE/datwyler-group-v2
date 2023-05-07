export const isEmail = () => {
	return (value: string) => {
		const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return regex.test(value);
	}
}
export const isDifferent = (arg: string | string[]) => {
	return (value: string) => {
		if (Array.isArray(arg)) {
			return arg.every((item) => item !== value);
		}
		return arg !== value;
	}
}

export const isPassword = () => {
	return (value: string) => {
		const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
		return regex.test(value);
	}
}

export const isLength = (min: number, max?: number) => {
	return (value: string) => {
		if (max) {
			return value.length >= min && value.length <= max;
		}
		return value.length >= min;
	}
}

export const objHasEmpty = (obj: any): boolean => {
	return Object.values(obj).some(
		(value) => value === "" || value === null || value === undefined
	);
};

export type Credentials = {
	id: number;
	username: string;
	password: string;
	token: string;
	certificate: string;
	type: string;
	clientId: number;
	[key: string]: any;
}

export type DeviceTypes = {
	id: number;
	name: string;
	[key: string]: any;
}
export type Protocol = {
	id: number;
	name: string;
	[key: string]: any;
}

export type Decoder = {
	id: number;
	name: string;
	description: string;
	fnc: string;
	[key: string]: any;
}

export type Profile = {
	id?: number;
	name: string;
	logo?: string;
	deviceType?: string;
	decoder?: number;
	protocolId?: number;
	createdAt?: string;
	description: string;
	cridentialsType?: string;
	deviceTypeId?: number;
	decoderId?: number;
	groupName?: string;
	[key: string]: any;
}