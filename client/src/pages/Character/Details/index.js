import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Element } from 'muejs';

// import './stylesheet.styl';

class CharacterDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Element height={3} width={6} className="character-details">
                <div className="pseudo">Shokkoht</div>
                <div className="skin">
                    <img src="https://s.ankama.com/www/static.ankama.com/dofus/renderer/look/7b317c36302c323039327c313d31363338303633342c323d31333732363031322c333d31363733353737382c343d323738363138362c353d31363736313930347c3135307d/full/1/250_250-10_100.png" />
                </div>
            </Element>
        );
    }
}

export default withRouter(CharacterDetails);