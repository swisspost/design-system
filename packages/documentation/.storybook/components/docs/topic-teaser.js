import React from "react";

export default class WelcomeTopicTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="docs-topic-teaser topic-teaser bg-nightblue mt-huge-r mb-giant-r">
        <div className="container">
          <div className="topic-teaser-container bg-nightblue">
            <div className="row pt-huge-r">
              <div className="topic-teaser-content">
                <h2 className="topic-teaser-title font-curve-large mb-large">
                  <span className="bold">Resources</span>
                  <span className="light">For a consistent user experience</span>
                </h2>
                <ul className="link-list mb-large">
                  <li className="link-list-item">
                    <a
                      target="_blank"
                      rel="noopener"
                      href={ `//getbootstrap.com/docs/${this.props.getVersion('bootstrap', 'Mm') ?? ''}` }
                    >
                      <span>Bootstrap Documentation</span>
                    </a>
                  </li>
                  <li className="link-list-item">
                    {/* exact link is not possible, because no version urls available */}
                    <a target="_blank" rel="noopener" href="https://fonts.post.ch/frutigerneueforpost/#/">
                      <span>Frutiger Neue For Post</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topic-teaser-image-container">
                <img
                  className="topic-teaser-image"
                  src="/images/topic-teaser.png"
                  width="100%"
                  height="100%"
                  alt="Lego"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
