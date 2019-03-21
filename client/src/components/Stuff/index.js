import React, { Component } from 'react';
import { Element, Grid, Icon } from 'muejs';
import {
    Amulet,
    Belt,
    Boots,
    Cloak, Dofus,
    Hat,
    Pet,
    Ring,
    Shield,
    Weapon,
} from "./equipments-icons";


import './stylesheet.styl';


const urlByBreed = {
    16: '7b317c333137392c333138337c313d234535453345342c323d233741413041302c333d234132363132412c343d233239384341392c353d234438433839347c3134357d'
};

export default class Stuff extends Component {
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
        const { character = {} } = this.props;

        const { pseudo, level, breed } = character;
        const avatarLink = `https://s.ankama.com/www/static.ankama.com/dofus/renderer/look/${urlByBreed[breed]}/full/${rotation}/250_250-10_100.png`;

        return (
            <Grid className="stuff" gap="1rem" columnsTemplate={'5.5rem 5.5rem 5.5rem 5.5rem 5.5rem 5.5rem '}>

                <Element fullWidth position="fixed" className="background-line" />

                {/* Row 1 */}
                <Icon className="share-icon" width={2} icon="share" size="small" onClick={this.copyUrlToClipboard} />

                <Element col={3} width={2} className="pseudo">
                    { pseudo }
                </Element>

                <Element col={5} width={2} className="level">
                    { level }
                </Element>


                <Element row={2} col={2} width={4} height={5} className="avatar">
                    <img alt="avatar" src={avatarLink} />
                </Element>

                {/* Left side */}
                <Element col={1} row={2} id="amulet" className="equipment">
                    <Amulet />
                </Element>
                <Element col={1} row={3} id="shield" className="equipment">
                    <Shield />
                </Element>
                <Element col={1} row={4} className="equipment ring">
                    <Ring />
                </Element>
                <Element col={1} row={5} id="belt" className="equipment">
                    <Belt />
                </Element>
                <Element col={1} row={6} id="boots" className="equipment">
                    <Boots />
                </Element>


                {/* Right side */}
                <Element col={6} row={2} id="hat" className="equipment">
                    <Hat />
                </Element>
                <Element col={6} row={3} id="weapon" className="equipment">
                    <Weapon />
                </Element>
                <Element col={6} row={4} className="equipment ring">
                    <Ring />
                </Element>
                <Element col={6} row={5} id="cloak" className="equipment">
                    <Cloak />
                </Element>
                <Element col={6} row={6} id="mount-or-pet" className="equipment">
                    <Pet />
                </Element>


                {/* Bottom side */}
                <Element col={1} row={7} className="equipment trophy">
                    <Dofus />
                </Element>
                <Element col={2} row={7} className="equipment trophy">
                    <Dofus />
                </Element>
                <Element col={3} row={7} className="equipment trophy">
                    <Dofus />
                </Element>
                <Element col={4} row={7} className="equipment trophy">
                    <Dofus />
                </Element>
                <Element col={5} row={7} className="equipment trophy">
                    <Dofus />
                </Element>
                <Element col={6} row={7} className="equipment trophy">
                    <Dofus />
                </Element>

            </Grid>
        );
    }
}
