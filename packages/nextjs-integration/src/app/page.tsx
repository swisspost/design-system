import {
  PostAccordion,
  PostAccordionItem,
  PostIcon,
  PostPopover,
  PostTabHeader,
  PostTabPanel,
  PostTabs,
  PostTooltip,
} from '@swisspost/design-system-components-react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1 className="visually-hidden">This is the homepage</h1>

      <section>
        <h2 className="h4 mt-huge-r">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <PostIcon name="1010" className="fs-small-huge"></PostIcon>
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>

      <section className="mt-huge-r">
        <div className="row">
          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2146" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">Umzug melden</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2026" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">Shop</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="3140" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">
                  Preise für Briefe und Pakete
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2456" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">
                  Paketetiketten erstellen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="1012" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">
                  Pakete abholen lassen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-full product-card">
              <div className="card-body p-16 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="1024" className="fs-bigger-big"></PostIcon>
                <p className="mt-8 text-center text-muted fs-regular fw-normal">
                  Personalisierte Briefmarken
                </p>
              </div>
            </a>
          </div>
        </div>
        <a href="" className="text-muted btn btn-tertiary btn-md mt-16">
          <PostIcon name="3020"></PostIcon>
          Alle Onlinedienste
        </a>
      </section>

      <section className="pt-huge-r mb-huge-r">
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-12 mb-16">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body palette-alternate">
                <h3 className="card-title">Hier steckt mehr drin</h3>
                <p className="card-text">Black-Week-Topangebote nicht verpassen</p>
                <a href="#" className="btn btn-tertiary">
                  <PostIcon name="3020"></PostIcon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-12 mb-16">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body palette-alternate">
                <h3 className="card-title">Einfach easy frankieren</h3>
                <p className="card-text">DigitalStamp: Mit der Post-App frankieren</p>
                <a href="#" className="btn btn-tertiary">
                  <PostIcon name="3020"></PostIcon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 col-12 mb-16">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body palette-alternate">
                <h3 className="card-title">Neue Briefmarken</h3>
                <p className="card-text">Entdecken Sie jetzt Ihre liebsten Motive</p>
                <a href="#" className="btn btn-tertiary">
                  <PostIcon name="3020"></PostIcon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-huge-r">
        <h2>Testing a couple web components</h2>
        <PostTabs>
          <PostTabHeader panel="one" data-tooltip-target="tooltip-one">
            Active
          </PostTabHeader>
          <PostTooltip id="tooltip-one">🚀</PostTooltip>
          <PostTabPanel name="one">A content</PostTabPanel>

          <PostTabHeader panel="two" data-tooltip-target="tooltip-two">
            Delivered
          </PostTabHeader>
          <PostTooltip className="palette-brand" id="tooltip-two">
            👻
          </PostTooltip>
          <PostTabPanel name="two">
            <p>Delivered packages</p>
            <div>
              <button className="btn btn-secondary" data-popover-target="popover-one">
                See details
              </button>
              <PostPopover id="popover-one" className="palette-accent" closeButtonCaption="close">
                <h3 className="h5 mt-0">Details for this content</h3>
                <p>Here are some more details for this content.</p>
                <div className="d-flex flex-row-reverse gap-16">
                  <button className="btn btn-primary">OK</button>
                  <button className="btn btn-secondary">Nope</button>
                </div>
              </PostPopover>
              <PostPopover closeButtonCaption="close">
                <h3>This is a direct import</h3>
              </PostPopover>
            </div>
          </PostTabPanel>
        </PostTabs>
        <h3>Frequently asked questions</h3>
        <PostAccordion headingLevel={4} className="mt-big-r" multiple>
          <PostAccordionItem>
            <span slot="header">Is this for real?</span>
            <p>No, this is just a fantasy.</p>
          </PostAccordionItem>
          <PostAccordionItem>
            <span slot="header">Scaramouche, Scaramouche, will you do the Fandango?</span>
            <p>
              Thunderbolt and lightning, very, very frightening me (Galileo) Galileo, (Galileo)
              Galileo, Galileo Figaro, magnifico
            </p>
          </PostAccordionItem>
        </PostAccordion>
      </section>
    </>
  );
}
