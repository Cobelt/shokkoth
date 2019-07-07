import React, { Component } from 'react';

import {Footer, FooterLine, FooterList, FooterSeparator, Element, Icon } from 'muejs';

import './stylesheet.styl';

export default class FooterComponent extends Component {
    render() {
        const { row } = this.props;

        return (
            <Footer row={row} columnsTemplate="repeat(3, 1fr)">

                <FooterList className="about-me" rowsTemplate={{ 1: '6vh' }} col={1}>
                    <Element type="h5">Who am I ?</Element>

                    <Element type="p" style={{textAlign: 'left'}}>
                        Hi ! I'm Paul / Cobelt, I'm a french 19 y.o. web developer.<br/>
                        I'm in love with WebDesign and JS/React, I take a lot of fun creating websites with those
                        technologies.<br/>
                        I currently work at Artprice, a french company near from Lyon, as a junior Full-Stack developer
                    </Element>
                </FooterList>

                <FooterList className="donation" rowsTemplate={{ 1: '6vh' }} col={2}>
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

                  <FooterList className="social" rowsTemplate={{ 1: '6vh' }} col={3}>
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

                <FooterSeparator row={2} col={1} width={3} />
                {/* <Element type="a" href="https://facebook.com/">Facebook</Element> */}

                {/* <Element type="a" href="https://www.youtube.com/channel/UC7rRGEAXomdP_iUCC0LV3Ag/live">Youtube</Element> */}

                <Element className="line-item" type="a" href="https://twitter.com/shokkoth" row={3} col={1}>
                  <span className="display-on-lg">Twitter (site)</span>
                  <Icon className="display-on-sm" icon="twitter" svg />
                </Element>

                <Element className="line-item" type="a" href="https://twitter.com/cobelt_dierk" row={3} col={2}>
                  <span className="display-on-lg">Twitter (perso)</span>
                  <Icon className="display-on-sm" icon="twitter" svg />
                </Element>

                {/* <Element type="a" href="https://www.instagram.com/cobelt_dierk">Instagram</Element> */}

                <Element className="line-item" type="a" href="http://github.com/cobelt" row={3} col={3}>
                  <span className="display-on-lg">Github</span>
                  <Icon className="display-on-sm" icon="github" svg />
                </Element>


                <FooterSeparator className="sm" row={4} col={1} width={3} />

                <Element className="justify-center" col={1} row={5} width={3}>
                  <span className="ankama-logo pad-1-rem">
                    Some images used belong to
                    <img src="//img.shokkoth.tk/assets/png/Ankama_logo.png" />
                  </span>
                </Element>
            </Footer>
        );
    }
}
