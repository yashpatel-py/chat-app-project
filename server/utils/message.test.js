let expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {
    it("should generate correct message object", ()=> {
        let from = "Yash Patel",
            text = "Some random text",
            message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
