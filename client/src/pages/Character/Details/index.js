import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Element, Icon } from 'muejs';

import { DofusIcon } from "./equipments-icons";

import './stylesheet.styl';


const urlByClass = {
    16: '7b317c333137392c333138337c313d234535453345342c323d233741413041302c333d234132363132412c343d233239384341392c353d234438433839347c3134357d'
}


class CharacterDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { rotation: 1 };
    }

    componentDidMount() {

    }

    copyUrlToClipboard = () => {
        const urlReceiver = document.createElement('input');
        document.body.appendChild(urlReceiver);
        urlReceiver.value = window.location.href;
        urlReceiver.select();
        document.execCommand('copy');
        document.body.removeChild(urlReceiver);
    };

    render() {
        const { rotation } = this.state;
        const avatarLink = `https://s.ankama.com/www/static.ankama.com/dofus/renderer/look/${urlByClass[16]}/full/${rotation}/250_250-10_100.png`;

        return (
            <Element height={3} width={6} className="character-details">
                <Grid gap="1rem" columnsTemplate={'5.5rem 5.5rem 5.5rem 5.5rem 5.5rem 5.5rem '}>
                    <Icon className="share-icon" width={2} icon="share" size="small" onClick={this.copyUrlToClipboard} />

                    <Element col={3} width={2} className="pseudo">
                        Shokkoht
                    </Element>
                    <Element col={5} width={2} className="level">
                        Lvl200+
                    </Element>

                    <Element col={2} width={4} height={5} className="avatar">
                        <img alt="avatar" src={avatarLink} />
                    </Element>

                    {/* Left side */}
                    <Element col={1} row={2} id="amulet" className="equipment">
                        Amulette
                    </Element>
                    <Element col={1} row={3} id="shield" className="equipment">
                        Bouclier
                    </Element>
                    <Element col={1} row={4} className="equipment ring">
                        Anneau
                    </Element>
                    <Element col={1} row={5} id="belt" className="equipment">
                        Ceinture
                    </Element>
                    <Element col={1} row={6} id="boots" className="equipment">
                        Bottes
                    </Element>


                    {/* Right side */}
                    <Element col={6} row={2} id="hat" className="equipment">
                        Coiffe
                    </Element>
                    <Element col={6} row={3} id="weapon" className="equipment">
                        Arme
                    </Element>
                    <Element col={6} row={4} className="equipment ring">
                        Anneau
                    </Element>
                    <Element col={6} row={5} id="cloak" className="equipment">
                        Cape
                    </Element>
                    <Element col={6} row={6} id="mount-or-pet" className="equipment">
                        Familier
                    </Element>


                    {/* Bottom side */}
                    <Element col={1} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>
                    <Element col={2} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>
                    <Element col={3} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>
                    <Element col={4} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>
                    <Element col={5} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>
                    <Element col={6} row={7} className="equipment trophy">
                        <DofusIcon />
                    </Element>

                </Grid>
            </Element>
        );
    }
}

export default withRouter(CharacterDetails);
