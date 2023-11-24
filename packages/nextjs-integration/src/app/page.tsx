import { Icon, TabHeader, TabPanel, Tabs, Tooltip } from './post-components';
export default function Home() {
  return (
    <>
      <h1 className="visually-hidden">This is the homepage</h1>

      <section>
        <h2 className="h4 mt-huge-r">Sendung Verfolgen</h2>
        <form className="bg-yellow mt-3 p-regular-r d-flex gap-4">
          <Icon name="1010" className="fs-small-huge"></Icon>
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
                <Icon name="2146" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">Umzug melden</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <Icon name="2026" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">Shop</p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <Icon name="3140" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Preise für Briefe und Pakete
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <Icon name="2456" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Paketetiketten erstellen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <Icon name="1012" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Pakete abholen lassen
                </p>
              </div>
            </a>
          </div>

          <div className="col-xl-2 col-md-6">
            <a href="#" className="card h-100 product-card">
              <div className="card-body p-3 product-navigation justify-content-start d-flex flex-column align-items-center">
                <Icon name="1024" className="fs-bigger-big"></Icon>
                <p className="mt-2 text-center text-muted fs-regular fw-normal">
                  Personalisierte Briefmarken
                </p>
              </div>
            </a>
          </div>
        </div>
        <a href="" className="text-muted btn btn-tertiary btn-md mt-3">
          <Icon name="3020"></Icon>
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
                  <img
                    className="topic-teaser-image"
                    src="https://www.post.ch/-/media/portal-opp/k/bilder/teaser-post-fuer-sie-1053-1053.jpg?mw=1200&vs=4&hash=7AE0C9728659DCC3B818B2E6B83EFB19"
                    width="100%"
                    height="100%"
                    alt="Test teaser image"
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
              <img
                className="card-img-top"
                src="https://www.post.ch/-/media/portal-opp/teaser/black-week-2023.jpg?mw=800&vs=1&hash=F13452D6C3082CE8D975D3299245BE92"
                alt="Card image cap"
              />
              <div className="card-body bg-gray">
                <h3 className="card-title">Hier steckt mehr drin</h3>
                <p className="card-text">Black-Week-Topangebote nicht verpassen</p>
                <a href="#" className="btn btn-tertiary">
                  <Icon name="3020"></Icon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-rg-6 col-12 mb-3">
            <div className="card elevation-0">
              <img
                className="card-img-top"
                src="https://www.post.ch/-/media/portal-opp/teaser/digitalstamp-1872x1053.jpg?mw=800&vs=1&hash=3DFC9BDB852E0A3057808362C7256029"
                alt="Card image cap"
              />
              <div className="card-body bg-gray">
                <h3 className="card-title">Einfach easy frankieren</h3>
                <p className="card-text">DigitalStamp: Mit der Post-App frankieren</p>
                <a href="#" className="btn btn-tertiary">
                  <Icon name="3020"></Icon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-rg-6 col-12 mb-3">
            <div className="card elevation-0">
              <img
                className="card-img-top"
                src="https://www.post.ch/-/media/portal-opp/teaser/big-teaser-briefmarkenausgabe-4-2023.png?mw=800&vs=1&hash=74CD9092923FB3B5BB1F55621C9A25FD"
                alt="Card image cap"
              />
              <div className="card-body bg-gray">
                <h3 className="card-title">Neue Briefmarken</h3>
                <p className="card-text">Entdecken Sie jetzt Ihre liebsten Motive</p>
                <a href="#" className="btn btn-tertiary">
                  <Icon name="3020"></Icon>
                  <span>Mehr erfahren</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-huge-r">
        <h2>Testing a couple web components</h2>
        <Tabs>
          <TabHeader panel="one" data-tooltip-target="tooltip-one">
            Active
          </TabHeader>
          <Tooltip id="tooltip-one">This is the first tab header that also has a tooltip</Tooltip>
          <TabPanel name="one">A content</TabPanel>

          <TabHeader panel="two">Delivered</TabHeader>
          <TabPanel name="two">
            <p>Delivered packages</p>
            <div>
              <button data-popover-target="popover-one">See details</button>
              <Popover id="popover-one">
                <h3 className="h5">Details for this content</h3>
                <p>Here are some more details for this content.</p>
                <div className="d-flex flex-row-reverse gap-3">
                  <button className="btn btn-primary">OK</button>
                  <button className="btn btn-secondary">Nope</button>
                </div>
              </Popover>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </>
  );
}
