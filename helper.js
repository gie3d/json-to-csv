export const getInputFilenameFromArgs = () => {
    const args = process.argv.slice(2); // Get arguments after the first two default ones
    if (args.length === 0) {
        throw new Error('No input filename provided');
    }
    return args[0];
};

export const buildArrayOfEmptyString = (length) => {
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push('');
	}

	return result;
};

export function isStringNumberBoolean(input) {
	const type = typeof input;
	return type === 'string' || type === 'number' || type === 'boolean';
}
