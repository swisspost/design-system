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
        <form className="bg-yellow mt-3 py-3 px-big d-flex gap-4">
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
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2146" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">Umzug melden</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2026" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">Shop</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="3140" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Preise für Briefe und Pakete
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="2456" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Paketetiketten erstellen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="1012" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Pakete abholen lassen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <PostIcon name="1024" className="fs-bigger-big"></PostIcon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Personalisierte Briefmarken
                </p>
              </div>
            </a>
          </div>
        </div>
        <a href="" className="text-muted btn btn-tertiary btn-md mt-3">
          <PostIcon name="3020"></PostIcon>
          Alle Onlinedienste
        </a>
      </section>

      <section className="mt-huge-r">
        <div className="topic-teaser mb-huge-r bg-yellow">
          <div className="container">
            <div className="topic-teaser-container bg-yellow">
              <div className="row pt-huge-r">
                <div className="topic-teaser-content">
                  <h2 className="topic-teaser-title font-curve-large mb-large">
                    <span className="bold">Post für Sie</span>
                    <span className="light">Einfach versenden, schnell ankommen</span>
                  </h2>
                  <ul className="link-list mb-large">
                    <li className="link-list-item">
                      <a href="#">
                        <span>Briefe versenden</span>
                      </a>
                    </li>

                    <li className="link-list-item">
                      <a href="#">
                        <span>Pakete versenden</span>
                      </a>
                    </li>

                    <li className="link-list-item">
                      <a href="#">
                        <span>Express und Kurier</span>
                      </a>
                    </li>

                    <li className="link-list-item">
                      <a href="#">
                        <span>Einschreiben aufgeben</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="topic-teaser-image-container">
                  <Image
                    width={1000}
                    height={1000}
                    className="topic-teaser-image w-100 h-100"
                    src="/street.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-huge-r mb-huge-r">
        <div className="row">
          <div className="col-lg-4 col-rg-6 col-12 mb-3">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body bg-gray">
                <h3 className="card-title">Hier steckt mehr drin</h3>
                <p className="card-text">Black-Week-Topangebote nicht verpassen</p>
                <a href="#" className="btn btn-tertiary">
                  <PostIcon name="3020"></PostIcon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-rg-6 col-12 mb-3">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body bg-gray">
                <h3 className="card-title">Einfach easy frankieren</h3>
                <p className="card-text">DigitalStamp: Mit der Post-App frankieren</p>
                <a href="#" className="btn btn-tertiary">
                  <PostIcon name="3020"></PostIcon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-rg-6 col-12 mb-3">
            <div className="card elevation-0">
              <Image width={400} height={200} className="card-img-top" src="/street.jpg" alt="" />
              <div className="card-body bg-gray">
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
          <PostTooltip className="bg-yellow" id="tooltip-two">
            👻
          </PostTooltip>
          <PostTabPanel name="two">
            <p>Delivered packages</p>
            <div>
              <button className="btn btn-secondary" data-popover-target="popover-one">
                See details
              </button>
              <PostPopover id="popover-one" className="bg-primary" closeButtonCaption="close">
                <h3 className="h5 mt-0">Details for this content</h3>
                <p>Here are some more details for this content.</p>
                <div className="d-flex flex-row-reverse gap-3">
                  <button className="btn btn-primary btn-rg">OK</button>
                  <button className="btn btn-secondary btn-rg">Nope</button>
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
