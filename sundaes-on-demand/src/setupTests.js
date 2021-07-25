// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// added v 47
// related to MSW from their page

// IMPORTANT
// WE ARE NOT MAKING THE MSW IN TEST THEY ARE HANDLED IN HERE IN SETUP FILE
// OPTION COMPONENT IS GOING TO HANDLE THE REQUEST, WHICH IS GOING TO INTERCEPT REQUEST AND RESPONSE TO THE TESTS

import { server } from "./mocks/server.js"
// Establish api mocking before all tests
beforeAll(() => server.listen())

// reset any request handlers that we may add during the tests,
// so they do not affect other tests
// example errors when we want it -> needed reset like she said
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())



