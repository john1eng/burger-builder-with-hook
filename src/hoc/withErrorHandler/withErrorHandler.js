import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hook/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [errorConfirmedHandler, error] = useHttpErrorHandler(axios)

            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={errorConfirmedHandler}>
                        {error ? error.message: null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            )
        

    }
}

export default withErrorHandler;