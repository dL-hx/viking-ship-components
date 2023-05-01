// npx jest .\jest.test.js
// 开启监听
// npx jest .\jest.test.js --watch

test('test common matcher', () => {
    expect((1 + 2)).toBe(3);
    expect(2 + 2).not.toBe(5)
});




test('test to be true or false', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
});



test('test number', () => {
    expect(4).toBeGreaterThan(3)
    expect(2).toBeLessThan(3)
});


test('test object', () => {
    // 测试一个对象
    // toBe完全相同
    // toEqual 值 是否相同
    // expect({name:'zhangsan'}).toBe({name:'zhangsan'})
    expect({name:'zhangsan'}).toEqual({name:'zhangsan'})
});

