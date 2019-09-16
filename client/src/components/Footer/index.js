import React, { Component } from 'react';

import {Footer, FooterLine, FooterList, FooterSeparator, Element, Icon } from 'muejs';

import './stylesheet.styl';

const FooterComponent = ({ row, ...otherProps }) => (
  <Footer style={{ marginTop: '3em' }} row={row} columnsTemplate="2fr 1px 1fr 1px 2fr" {...otherProps}>

      <FooterList className="social hide-until-sm" rowsTemplate="1fr 1fr" col={1}>
          <Element type="h5">Un problème ?</Element>

          <FooterLine>
            <Element className="line-item marg-8 pad-0" type="a" href="https://twitter.com/shokkoth" title="twitter du site">
              <Icon icon="twitter" svg />
            </Element>

            <Element className="line-item marg-8 pad-0" type="a" href="https://github.com/cobelt">
              <Icon icon="github" svg />
            </Element>

            <Element className="line-item marg-8 pad-0" type="a" href="mailto:cobelt60@gmail.com">
              <Icon icon="gmail" svg />
            </Element>

            <Element className="line-item marg-8 pad-0" type="a" href="https://twitter.com/shokkoth" title="twitter perso">
              <Icon icon="twitter" svg />
            </Element>
          </FooterLine>
      </FooterList>


      <Element className="vertical-separator hide-until-sm" col={2} />


      <FooterList className="partenaire hide-until-sm" rowsTemplate="1fr 1fr" col={3}>
        <Element type="h5">Partenaire avec</Element>

        <FooterLine>
            <Element type="a" href="https://www.twitch.tv/huzounet">Huz</Element>
            <Element type="a" href="https://www.twitch.tv/kapotaque">Kapotaque</Element>
        </FooterLine>
      </FooterList>


      <Element className="vertical-separator hide-until-sm" col={4} />


      <FooterList className="donation" rowsTemplate="1fr 1fr" col={{ xs: 1, sm: 5 }} width={{ xs: 5, sm: 1 }}>
        <Element type="h5">Me soutenir</Element>

        <FooterLine>
            <Element type="a" href="https://www.tipeee.com/cobelt">Tipeee</Element>
            <Element type="a" href="https://www.utip.io">U-Tip</Element>
            <Element type="a" href="https://www.twitch.tv/cobeltdierk">Twitch</Element>
        </FooterLine>
      </FooterList>


      <Element className="justify-center" col={1} row={2} width={3}>
        <span className="ankama-logo pad-1-rem">
          <span>Les images</span>
          <span className="hide-until-sm">d'équipements, ressources et classes</span>
          <span>appartiennent</span>
          <span>à</span>
          <img src="//img.shokkoth.tk/assets/png/Ankama_logo.png" />
        </span>
      </Element>
  </Footer>
);

export default FooterComponent;
