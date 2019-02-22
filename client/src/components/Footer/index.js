import React, { Component } from 'react';

import {Footer, FooterLine, FooterList, FooterSeparator, Element} from 'muejs';

export default class FooterComponent extends Component {
    render() {
        const { row, idgrid } = this.props;

        return (
            <Footer idgrid={idgrid} row={row} columnsTemplate={"0.55fr 0.55fr 0.4fr 0.4fr 0.55fr 0.55fr"}>
                <FooterList row={1} col={1} width={2}>
                    <Element type="h5">Who am I ?</Element>

                    <Element type="p" style={{textAlign: 'left'}}>
                        Hi ! I'm Paul / Cobelt, I'm a french 19 y.o. web developer.<br/>
                        I'm in love with WebDesign and JS/React, I take a lot of fun creating websites with those
                        technologies.<br/>
                        I currently work at Artprice, a french company near from Lyon, as a junior Full-Stack developer
                    </Element>
                </FooterList>

                <FooterList className="donation" row={1} col={3} width={2}>
                    <Element type="h5">Donation</Element>

                    <Element type="p">
                        If you like my work and want to support me, you can do it here&nbsp;:
                    </Element>

                    <FooterLine>
                        <Element type="a" href="https://www.tipeee.com/cobelt">Tipeee</Element>
                        <Element type="a" href="https://www.utip.io">U-Tip</Element>
                        <Element type="a" href="https://www.twitch.tv/cobeltdierk">Twitch</Element>
                    </FooterLine>
                </FooterList>

                <FooterList className="social" row={1} col={5} width={2}>
                    <Element type="h5">What do I do ?</Element>

                    <Element type="p" style={{textAlign: 'right'}}>
                        Websites. I'm creating a react framework, MueJS, to create them easier.
                    </Element>

                    <FooterLine row={1}>
                        <Element type="a" href="http://cobelt.fr">cobelt.fr</Element>
                        <Element type="a" href="http://muejs.cobelt.fr">muejs.fr</Element>
                        <Element type="a" href="http://karyt.fr">karyt.fr</Element>
                    </FooterLine>
                </FooterList>

                <FooterSeparator row={2} col={2} width={4}/>

                <FooterLine row={3}>
                    <Element type="a">Facebook</Element>

                    <Element type="a" href="https://www.youtube.com/channel/UC7rRGEAXomdP_iUCC0LV3Ag/live">Youtube</Element>

                    <Element type="a" href="https://twitter.com/cobelt_dierk">Twitter</Element>

                    <Element type="a" href="https://www.instagram.com/cobelt_dierk">Instagram</Element>

                    <Element type="a" href="http://github.com/cobelt">Github</Element>
                </FooterLine>
            </Footer>
        );
    }
}
