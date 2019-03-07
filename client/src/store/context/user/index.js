import React, { Component } from 'react';
import { UserReducer } from '../../reducers/user';


const UserContext = React.createContext();
export default UserContext;


export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {
    constructor (props) {
        super(props);

        this.state = {
            store: {},
            dispatch: transmitStore => {
                const action = transmitStore(this.state.store);

                if (!action) return;

                this.setState(({ store }) => ({
                    store: {
                        user: userReducer(store.user, action),
                    }
                }));
            },
        };
    }


    render() {
        return (
            <UserContext.Provider value={ this.state }>
                { this.props.children }
            </UserContext.Provider>
        )
    }
}
