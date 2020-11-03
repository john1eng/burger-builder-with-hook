import reducer from './auth';
import * as actionTypes from '../actions/actionTypes'

describe("Auth Reducer", () => {
    const initialState = {
        userId: null,
        token: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it("should return initial state obj if pass a empty object", () => {
        expect(reducer(undefined ,{})).toEqual(initialState)
    })
    it("should store the token and userId upon login", () => {
        expect(reducer({
            userId: null,
            token: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        } ,{
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'}))
                .toEqual({
                    userId: 'some-user-id',
                    token: 'some-token',
                    error: null,
                    loading: false,
                    authRedirectPath: '/'
                })
    })
   
})