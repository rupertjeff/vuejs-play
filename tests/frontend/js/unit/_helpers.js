/**
 * Helper to assist in testing actions. Stubs out the commit function to simply
 * record what mutations are being run through commit, without changing state.
 *
 * @param t
 * @param {Function} action
 * @param {Array} args
 * @param {Object} state
 * @param {Array} expectedMutations
 */
export const testAction = (t, action, args, state, expectedMutations) => {
    let count = 0;

    // mock commit
    const commit = (type, payload) => {
        const mutation = expectedMutations[count];
        t.is(type, mutation.type);
        if (payload) {
            t.deepEqual(payload, mutation.payload);
        }
        count++;
    };

    // call the action with mocked store and arguments
    action({commit, state}, ...args);

    t.is(expectedMutations.length, count);
};

/**
 * Quick way to make notes.
 *
 * @param {int} num
 * @returns {Array}
 */
export const makeNotes = (num) => {
    let notes = [];

    while (0 < num--) {
        notes.push({
            title: 'New Note' + num,
            content: 'Some Content'
        });
    }

    return notes;
};

/**
 * Defines a default state that may exist in state. Will create as many notes
 * as desired by the test.
 *
 * @param {int} num
 * @returns {{notes: Array, activeNote: {}}}
 */
export const getDefaultState = (num) => {
    const notes = makeNotes(num),
        activeNote = 0 < num ? notes[0] : {};

    return {
        notes,
        activeNote
    }
};
