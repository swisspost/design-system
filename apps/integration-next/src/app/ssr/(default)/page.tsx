import { PostAccordion, PostAccordionItem, PostAutocomplete, PostAvatar, PostBanner, PostClosebutton, PostCollapsible, PostCollapsibleTrigger, PostDatePicker, PostIcon, PostLinkarea, PostListbox, PostListboxOption, PostMenu, PostMenuItem, PostMenuTrigger, PostNumberInput, PostPagination, PostPopover, PostPopoverTrigger, PostRating, PostStepper, PostStepperItem, PostTabItem, PostTabPanel, PostTabs, PostTogglebutton, PostTooltip, PostTooltipTrigger } from '@swisspost/design-system-components-react/server';
import { PostIconExplosives, PostIconLetter, PostIconLetterSolid } from '@swisspost/design-system-components-react/icons';

export default function Home() {
  return (
    <>
      <h1>Design System Components</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea debitis ex rem minus! Ut
        mollitia deserunt iure impedit. Enim, officia. Fugiat, cupiditate repellat? Excepturi est
        iusto suscipit, omnis iste laboriosam!
      </p>
  <h2>Accordion</h2>
  <h3>default</h3>
  <PostAccordion headingLevel={3} data-version="10.0.0-next.67">
    <PostAccordionItem id="pvHU-dC" data-version="10.0.0-next.67">
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="pO4AR1z" data-version="10.0.0-next.67">
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="pIs3bTc" data-version="10.0.0-next.67">
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>logos</h3>
  <PostAccordion headingLevel={4} data-version="10.0.0-next.67">
    <PostAccordionItem id="pk7kGSm" data-version="10.0.0-next.67"><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="piNklXX" data-version="10.0.0-next.67"><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="pJzIWW_" data-version="10.0.0-next.67"><img slot="logo" alt="logo" src="/assets/images/logo-swisspost.svg" />
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>multiple-open-panels</h3>
  <PostAccordion headingLevel={4} multiple={true} data-version="10.0.0-next.67">
    <PostAccordionItem id="pVdG5Ky" data-version="10.0.0-next.67">
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="pfq5wkw" data-version="10.0.0-next.67">
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    <PostAccordionItem collapsed={true} id="pAIiozi" data-version="10.0.0-next.67">
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
    </PostAccordionItem>
    </PostAccordion>

  <h3>default-collapsed-panels</h3>
  <PostAccordion headingLevel={4} data-version="10.0.0-next.67" data-hydrated="">
      <PostAccordionItem collapsed={true} id="ptCN5kS" data-version="10.0.0-next.67" data-hydrated="" headingLevel={4}>
    <span slot="header">Title 1</span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
      <PostAccordionItem id="pLcryjL" data-version="10.0.0-next.67" data-hydrated="" headingLevel={4}>
    <span slot="header">Title 2</span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
      <PostAccordionItem collapsed={true} id="phKUMlR" data-version="10.0.0-next.67" data-hydrated="" headingLevel={4}>
    <span slot="header">Title 3</span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
      </PostAccordionItem>
    </PostAccordion>

  <h3>nested</h3>
  <PostAccordion headingLevel={4} data-version="10.0.0-next.67">
      <PostAccordionItem id="p8Qr7dy" data-version="10.0.0-next.67">
    <span slot="header">Title 1 <code>h4</code></span>
    <p>
      Example content for accordion item 1. This is a sample text demonstrating how the
      accordion component works.
    </p>
    <PostAccordion headingLevel={5} data-version="10.0.0-next.67">
          <PostAccordionItem collapsed={true} id="ptc3pLm" data-version="10.0.0-next.67">
    <span slot="header">Title 1.1 <code>h5</code></span>
    <p>
      Example content for accordion item 1.1. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem collapsed={true} id="p7nP593" data-version="10.0.0-next.67">
    <span slot="header">Title 1.2 <code>h5</code></span>
    <p>
      Example content for accordion item 1.2. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem collapsed={true} id="pGXq6ow" data-version="10.0.0-next.67">
    <span slot="header">Title 1.3 <code>h5</code></span>
    <p>
      Example content for accordion item 1.3. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
    </PostAccordion>
        <div></div>
      </PostAccordionItem>
      <PostAccordionItem collapsed={true} id="pRnOSdN" data-version="10.0.0-next.67">
    <span slot="header">Title 2 <code>h4</code></span>
    <p>
      Example content for accordion item 2. This is a sample text demonstrating how the
      accordion component works.
    </p>
        <div>
    <PostAccordion headingLevel={5} data-version="10.0.0-next.67">
          <PostAccordionItem collapsed={true} id="p2zrSJW" data-version="10.0.0-next.67">
    <span slot="header">Title 2.1 <code>h5</code></span>
    <p>
      Example content for accordion item 2.1. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem collapsed={true} id="pn_p7Ki" data-version="10.0.0-next.67">
    <span slot="header">Title 2.2 <code>h5</code></span>
    <p>
      Example content for accordion item 2.2. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
          <PostAccordionItem collapsed={true} id="pB_r_8T" data-version="10.0.0-next.67">
    <span slot="header">Title 2.3 <code>h5</code></span>
    <p>
      Example content for accordion item 2.3. This is a sample text demonstrating how the
      accordion component works.
    </p>
          </PostAccordionItem>
    </PostAccordion>
  </div>
      </PostAccordionItem>
      <PostAccordionItem collapsed={true} id="p79gLGH" data-version="10.0.0-next.67">
    <span slot="header">Title 3 <code>h4</code></span>
    <p>
      Example content for accordion item 3. This is a sample text demonstrating how the
      accordion component works.
    </p>
        <div></div>
      </PostAccordionItem>
    </PostAccordion>

  <h2>AccordionItem</h2>
  <PostAccordionItem id="pcgi686" data-version="10.0.0-next.67" />

  <h2>Autocomplete</h2>
  <h3>default</h3>
  <PostAutocomplete filterThreshold={0} data-version="10.0.0-next.67">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--default-input" role="combobox" aria-autocomplete="list" aria-controls="646dcad2-9a89-4296-b39d-e5205d1cc34d" aria-expanded="false" autocomplete="off" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--default-input">Country</label>
        </div>
        <PostListbox id="646dcad2-9a89-4296-b39d-e5205d1cc34d" data-version="10.0.0-next.67">
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-27df82e6-92e5-4125-b659-b062a6d547ee" data-hydrated="" />
    <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-297f2d70-0faa-49d1-b05b-0d8d19c1e050" data-hydrated="" />
    <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-c3ddc587-0f46-43b2-be07-718064d0eae8" data-hydrated="" />
    <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-e7f6b076-bbc4-4b39-9eb0-2d44dc8ce4a6" data-hydrated="" />
    <PostListboxOption value="Austria" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-04b4fa7f-f680-497b-8d52-78b265fa46bc" data-hydrated="" />
    <PostListboxOption value="Spain" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-62965dac-dd13-46e4-9254-46e87503c879" data-hydrated="" />
    <PostListboxOption value="Portugal" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-a89c87c2-207a-4e51-b417-5609f6799794" data-hydrated="" />
    <PostListboxOption value="Netherlands" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-10475a95-4fe7-40b4-bbdc-f1b800cbc8b7" data-hydrated="" />
    <PostListboxOption value="Belgium" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-da323620-ffd4-4312-ba82-476b12bd9070" data-hydrated="" />
    <PostListboxOption value="Sweden" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-91898cdb-6071-4843-8c04-1f01069effed" data-hydrated="" />
  </PostListbox>
      </PostAutocomplete>

  <h3>clearable</h3>
  <PostAutocomplete clearable={true} filterThreshold={0} data-version="10.0.0-next.67">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--clearable-input" role="combobox" aria-autocomplete="list" aria-controls="a6f5788b-b139-41d8-b372-7d6fccf293d6" aria-expanded="false" autocomplete="off" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--clearable-input">Country</label>
        </div>
        <PostListbox id="a6f5788b-b139-41d8-b372-7d6fccf293d6" data-version="10.0.0-next.67">
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-a867a905-6f97-4a1c-97c7-1378a743b295" data-hydrated="" />
    <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-bf5c9b05-bd38-4990-8918-1b5c27ad0a86" data-hydrated="" />
    <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-364f789d-fef8-4d81-9982-35753a6176f8" data-hydrated="" />
    <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-6d379cc8-53ee-49a9-b281-70e70cae9cd0" data-hydrated="" />
    <PostListboxOption value="Austria" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-7cc3b92a-9b0b-4a2b-a46a-3985d9691d5e" data-hydrated="" />
    <PostListboxOption value="Spain" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-9a143b3a-030a-437f-8f2b-9b30b166da81" data-hydrated="" />
    <PostListboxOption value="Portugal" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-eccfa484-d0ad-4556-a630-cb6dcf0fcb4e" data-hydrated="" />
    <PostListboxOption value="Netherlands" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-ffe9905d-f30c-4b69-a161-1fe2388ff1d9" data-hydrated="" />
    <PostListboxOption value="Belgium" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-c85b03de-3a39-4a58-bd10-807b3f0899c9" data-hydrated="" />
    <PostListboxOption value="Sweden" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-e6150be2-e36c-4e4e-a290-730cf5f9cf2c" data-hydrated="" />
  </PostListbox>
      </PostAutocomplete>

  <h3>detached-listbox</h3>
  <PostAutocomplete filterThreshold={0} listbox="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-listbox" data-version="10.0.0-next.67">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-input" role="combobox" aria-autocomplete="list" aria-controls="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-listbox" aria-expanded="false" autocomplete="off" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-input">Country</label>
        </div>
      </PostAutocomplete>
      <PostListbox id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--detached-listbox-listbox" data-version="10.0.0-next.67">
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-65940c2f-f01b-45d0-b0a2-99eee506aa3c" data-hydrated="" />
    <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-acd22c6c-14d8-4212-8832-33e16e842f5a" data-hydrated="" />
    <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-e8316b3e-e42b-49e5-801a-ee720d9b9a34" data-hydrated="" />
    <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-8797bf9e-7896-4048-b573-e6acaab03375" data-hydrated="" />
    <PostListboxOption value="Austria" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-c5387b1b-d373-4345-9aad-48d080886a9e" data-hydrated="" />
    <PostListboxOption value="Spain" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-fd334729-6fc4-4654-9e4b-08b4aa10fa44" data-hydrated="" />
    <PostListboxOption value="Portugal" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-0371255d-6185-4459-b961-d4a16a3b5d28" data-hydrated="" />
    <PostListboxOption value="Netherlands" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-caf04bda-d3a0-409a-8c0e-eddd9878772a" data-hydrated="" />
    <PostListboxOption value="Belgium" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-4631de73-fdf6-4172-bd61-dd076a462c55" data-hydrated="" />
    <PostListboxOption value="Sweden" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-e82c2196-ba65-493a-aa46-b3bbd643119b" data-hydrated="" />
  </PostListbox>

  <h3>filter-threshold</h3>
  <PostAutocomplete filterThreshold={3} data-version="10.0.0-next.67">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--filter-threshold-input" role="combobox" aria-autocomplete="list" aria-controls="00ca4943-bcb9-4590-afae-0f426191acb0" aria-expanded="false" autocomplete="off" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--filter-threshold-input">Country</label>
        </div>
        <PostListbox id="00ca4943-bcb9-4590-afae-0f426191acb0" data-version="10.0.0-next.67">
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-d3d54ff5-417b-4a80-8858-ce720281a5d0" data-hydrated="" />
    <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-0d9e9c60-e2be-43b3-98fd-9619dcfdd5c3" data-hydrated="" />
    <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-8f66ba7a-a5ac-4e66-a0a5-a3508a90d1d5" data-hydrated="" />
    <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-b50907bd-06b0-4f06-b4b0-0297281b38bc" data-hydrated="" />
    <PostListboxOption value="Austria" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-288ac972-06d1-44bd-9276-548f066dcc9f" data-hydrated="" />
    <PostListboxOption value="Spain" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-d33fd283-54d0-48eb-949a-9d3030bb5c90" data-hydrated="" />
    <PostListboxOption value="Portugal" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-9e9338a5-bc72-41d3-9312-0489b57b4faa" data-hydrated="" />
    <PostListboxOption value="Netherlands" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-855e4969-807a-428c-a8e6-51c86eb4b984" data-hydrated="" />
    <PostListboxOption value="Belgium" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-ae585c82-1006-4397-b684-2fe34a11e0e5" data-hydrated="" />
    <PostListboxOption value="Sweden" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-62b08f9e-c6f0-4f6f-b1f2-83e23a46c15d" data-hydrated="" />
  </PostListbox>
      </PostAutocomplete>

  <h3>option-description</h3>
  <PostAutocomplete filterThreshold={0} data-version="10.0.0-next.67">
        <div className="form-floating">
          <input className="form-control" type="text" placeholder="Select Country" id="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--option-description-input" role="combobox" aria-autocomplete="list" aria-controls="9504e633-6052-4e77-abc5-c3b977c1ed3c" aria-expanded="false" autocomplete="off" />
          <label className="form-label" htmlFor="5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d--option-description-input">Country</label>
        </div>
        <PostListbox id="9504e633-6052-4e77-abc5-c3b977c1ed3c" data-version="10.0.0-next.67">
    <div slot="blank-slate">Nothing to see here</div>
    <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-9e7c00bb-261f-4011-9b5c-77c614447115" data-hydrated="">Alpine Region</PostListboxOption>
    <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-ef770d80-b6ce-4465-a8cf-b98636131e32" data-hydrated="">Central Europe</PostListboxOption>
    <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-7a52f83f-97bc-4450-b934-3aa20764c65d" data-hydrated="">Western Europe</PostListboxOption>
    <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-6c103f93-93b9-45d0-a006-2bee828c6dd6" data-hydrated="">Southern Europe</PostListboxOption>
    <PostListboxOption value="Austria" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-e78660db-bd20-4b2f-a4ec-73c1c951d127" data-hydrated="">Alpine Region</PostListboxOption>
    <PostListboxOption value="Spain" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-ded3e0d4-b58f-4f01-966c-9008c5babe3d" data-hydrated="">Iberian Peninsula</PostListboxOption>
    <PostListboxOption value="Portugal" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-6feb4622-8f0a-488c-a100-4c2ef0083de6" data-hydrated="">Iberian Peninsula</PostListboxOption>
    <PostListboxOption value="Netherlands" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-a93323bd-5c1e-47fe-ad08-45d7588abf11" data-hydrated="">Benelux</PostListboxOption>
    <PostListboxOption value="Belgium" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-9db95ba8-abf1-4c7e-abd1-b6369db495ad" data-hydrated="">Benelux</PostListboxOption>
    <PostListboxOption value="Sweden" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-cea11203-d52b-4721-8f4e-3f0f3b3f0c25" data-hydrated="">Scandinavia</PostListboxOption>
  </PostListbox>
      </PostAutocomplete>

  <h2>Avatar</h2>
  <h3>default</h3>
  <PostAvatar firstname="Firstname" description="The current user is Firstname." data-version="10.0.0-next.67" data-hydrated="" />

  <h3>anchor-wrapped</h3>
  <a href="#"><PostAvatar firstname="Firstname" description="The current user is Firstname." data-version="10.0.0-next.67" data-hydrated="" /></a>

  <h3>button-wrapped</h3>
  <button><PostAvatar firstname="Firstname" description="The current user is Firstname." data-version="10.0.0-next.67" data-hydrated="" /></button>

  <h2>Banner</h2>
  <h3>default</h3>
  <PostBanner data-version="10.0.0-next.67" role="alert" data-color-scheme="light" type="info" data-hydrated="">
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

  <h3>contents</h3>
  <PostBanner data-version="10.0.0-next.67" role="alert" data-color-scheme="light" type="info" data-hydrated="">
      <h4 slot="heading">Heading Title</h4><ul className="list-unstyled"><li className="d-flex gap-8"><PostIcon name="moon" data-version="10.0.0-next.67" data-hydrated="" />An example list item</li><li className="d-flex gap-8"><PostIcon name="sun" data-version="10.0.0-next.67" data-hydrated="" />Another example list item</li></ul><hr className="w-full" /><p>This is the banner content that provides important information to the user.</p><button slot="actions" className="btn btn-secondary"><span>Cancel</span></button><button slot="actions" className="btn btn-primary"><span>Accept</span></button>
    </PostBanner>

  <h3>dismissible</h3>
  <PostBanner data-version="10.0.0-next.67" role="alert" data-color-scheme="light" type="info" data-hydrated="">
       <PostClosebutton slot="close-button" data-version="10.0.0-next.67" placement="auto" size="default" data-hydrated=""><button type="button" className="btn btn-icon btn-secondary btn-sm"><PostIcon aria-hidden="true" data-version="10.0.0-next.67" name="closex" data-hydrated="" /><span className="visually-hidden"> Close </span></button></PostClosebutton> 
      <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
    </PostBanner>

  <h2>Closebutton</h2>
  <h3>default</h3>
  <div className="mock-element">
    <PostClosebutton data-version="10.0.0-next.67" placement="auto" size="default" data-hydrated=""><button type="button" className="btn btn-icon btn-secondary btn-sm"><PostIcon aria-hidden="true" data-version="10.0.0-next.67" name="closex" data-hydrated="" /><span className="visually-hidden">
      Close
    </span></button></PostClosebutton>
  </div>

  <h3>automatic-positioning</h3>
  <div className="position-relative">Closable element 
    <PostClosebutton data-version="10.0.0-next.67" placement="auto" size="default" data-hydrated=""><button type="button" className="btn btn-icon btn-secondary btn-sm"><PostIcon aria-hidden="true" data-version="10.0.0-next.67" name="closex" data-hydrated="" /><span className="visually-hidden">
      Close
    </span></button></PostClosebutton>
  </div>

  <h2>Collapsible</h2>
  <h3>default</h3>
  <div className="d-flex flex-column gap-16">
    <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default" data-version="10.0.0-next.67" data-hydrated="">
      <button className="btn btn-secondary" aria-controls="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default" aria-expanded="true">Toggle Collapsible</button>
    </PostCollapsibleTrigger>
    <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default" data-version="10.0.0-next.67" data-hydrated="">
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>
  </div>

  <h3>initially-collapsed</h3>
  <div className="d-flex flex-column gap-16">
    <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--initially-collapsed" data-version="10.0.0-next.67" data-hydrated="">
      <button className="btn btn-secondary" aria-controls="6a91848c-16ec-4a23-bc45-51c797b5b2c3--initially-collapsed" aria-expanded="false">Toggle Collapsible</button>
    </PostCollapsibleTrigger>
    <PostCollapsible id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--initially-collapsed" collapsed="" data-version="10.0.0-next.67" tabindex="-1" data-hydrated="" style={{ height: '0px', overflow: 'hidden' }}>
      <p className="border rounded p-24">This is collapsible content that can be shown or hidden.</p>
    </PostCollapsible>
  </div>

  <h2>DatePicker</h2>
  <h3>default</h3>
  <PostDatePicker textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="main">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY</p>
    </PostDatePicker>

  <h3>inline</h3>
  <PostDatePicker inline={true} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="inline" data-hydrated=""> </PostDatePicker>

  <h3>inline-range</h3>
  <PostDatePicker inline={true} range={true} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="inline-range" data-hydrated=""> </PostDatePicker>

  <h3>range</h3>
  <PostDatePicker range={true} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="range" data-hydrated="">
      <input className="form-control" type="text" />
      <p className="form-hint">Format: DD.MM.YYYY - DD.MM.YYYY</p>
    </PostDatePicker>

  <h3>disabled-dates</h3>
  <PostDatePicker inline={true} textToggleCalendar="Open calendar" textNextDecade="Next decade" textNextMonth="Next month" textNextYear="Next year" textPreviousDecade="Previous decade" textPreviousMonth="Previous month" textPreviousYear="Previous year" textSwitchYear="Switch to year view" id="disabled-dates" data-hydrated=""> </PostDatePicker>

  <h2>Linkarea</h2>
  <PostLinkarea className="palette palette-alternate p-32 rounded-8" data-version="10.0.0-next.67" data-hydrated="">
      <h5>My clickable element</h5>
      <p>
        Clicking anywhere within this <code>post-linkarea</code> will click on the link that is
        placed within the component.
      </p>
      <a target="_blank" href="https://post.ch">Link text</a>
    </PostLinkarea>

  <h2>Listbox</h2>
  <div style={{ width: '280px' }}>
      <PostListbox id="listbox-fb749467-c70e-4d87-b639-03cc713a8370--default" data-version="10.0.0-next.67">
        <div slot="blank-slate">Nothing to see here</div>
        <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-328845b0-992a-415c-8119-dfbb16342bcb" data-hydrated="" />
        <PostListboxOption value="Germany" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-6dff1f40-fe7c-444a-880f-8b55500fa011" data-hydrated="" />
        <PostListboxOption value="France" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-35fc8506-3d07-4a8d-9103-e7dee34a29a3" data-hydrated="" />
        <PostListboxOption value="Italy" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-709d6323-5d21-4af6-afc9-89d29bea0fd6" data-hydrated="" />
      </PostListbox>
    </div>

  <h2>ListboxOption</h2>
  <div style={{ width: '280px' }}>
      <PostListbox id="listbox-option-preview" data-version="10.0.0-next.67">
        <PostListboxOption value="Switzerland" data-version="10.0.0-next.67" role="option" aria-selected="false" id="post-listbox-option-18c29c8d-db00-4429-bb8f-32229dd3e325" data-hydrated="">
          Switzerland
        </PostListboxOption>
      </PostListbox>
    </div>

  <h2>Menu</h2>
  <h3>default</h3>
  <PostMenuTrigger for="menu--default" data-version="10.0.0-next.67" data-hydrated="">  <button className="btn btn-secondary" type="button" aria-haspopup="menu" aria-expanded="false">Open Menu</button>  </PostMenuTrigger>
      <PostMenu id="menu--default" label="Menu description" data-version="10.0.0-next.67" data-hydrated="">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>right</h3>
  <PostMenuTrigger for="menu--right" data-version="10.0.0-next.67" data-hydrated="">  <button className="btn btn-secondary" type="button" aria-haspopup="menu" aria-expanded="false">Menu on the right</button>  </PostMenuTrigger>
      <PostMenu id="menu--right" placement="right" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>icon-trigger</h3>
  <PostMenuTrigger for="menu--icon-trigger" data-version="10.0.0-next.67" data-hydrated=""> 
      <button className="btn btn-tertiary btn-lg btn-icon" type="button" aria-haspopup="menu" aria-expanded="false">
        <PostIcon aria-hidden="true" name="home" data-version="10.0.0-next.67" data-hydrated="" />
        <span className="visually-hidden">Open home menu</span>
      </button>
     </PostMenuTrigger>
      <PostMenu id="menu--icon-trigger" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/first">First menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/second">Second menu item</a></PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated=""><a href="/third">Third menu item</a></PostMenuItem>
      </PostMenu>

  <h3>mixed-content</h3>
  <PostMenuTrigger for="menu--mixed-content" data-version="10.0.0-next.67" data-hydrated="">  <button className="btn btn-secondary" type="button" aria-haspopup="menu" aria-expanded="false">Mixed content</button>  </PostMenuTrigger>
      <PostMenu id="menu--mixed-content" label="Menu description" data-version="10.0.0-next.67">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <a href="/details">View details <em className="fs-7">link</em></a>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">Duplicate <em className="fs-7">button</em></button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">Delete <em className="fs-7">button</em></button>
      </PostMenuItem>
      </PostMenu>

  <h3>with-icons</h3>
  <PostMenuTrigger for="menu--with-icons" data-version="10.0.0-next.67" data-hydrated="">  <button className="btn btn-secondary" type="button" aria-haspopup="menu" aria-expanded="false">Icons in front</button>  </PostMenuTrigger>
      <PostMenu id="menu--with-icons" label="Menu description" data-version="10.0.0-next.67" data-hydrated="">
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button"><PostIcon aria-hidden="true" name="edit" data-version="10.0.0-next.67" data-hydrated="" /> Edit</button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button"><PostIcon aria-hidden="true" name="copy" data-version="10.0.0-next.67" data-hydrated="" /> Copy</button>
      </PostMenuItem>
      <PostMenuItem data-version="10.0.0-next.67" data-hydrated="">
        <button type="button">
          <PostIcon aria-hidden="true" name="trash" data-version="10.0.0-next.67" data-hydrated="" /> Delete
        </button>
      </PostMenuItem>
      </PostMenu>

  <h2>NumberInput</h2>
  <h3>default</h3>
  <PostNumberInput className="form-floating" data-version="10.0.0-next.67" data-hydrated="">
    <input type="number" id="number-input--default" className="form-control" placeholder="" aria-describedby="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--default" />
   <label className="form-label" htmlFor="number-input--default">Quantity</label> 
      </PostNumberInput>
      <p className="form-hint" id="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--default">This is helpful text that provides guidance or additional information to assist the user in filling out this field correctly.</p>

  <h3>floating-label</h3>
  <PostNumberInput className="form-floating" data-version="10.0.0-next.67" data-hydrated="">
    <input type="number" id="number-input--floating-label" className="form-control" placeholder="" />
   <label className="form-label" htmlFor="number-input--floating-label">Quantity</label> 
      </PostNumberInput>

  <h3>small</h3>
  <label className="form-label" htmlFor="number-input--small">Quantity</label> 
      <PostNumberInput data-version="10.0.0-next.67" className="" data-hydrated="">
    <input type="number" id="number-input--small" className="form-control form-control-sm" aria-describedby="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--small" />
      </PostNumberInput>
      <p className="form-hint" id="form-hint-d5f43fa8-42ba-4cb9-98c7-9386d4c939bb--small">This is helpful text that provides guidance or additional information to assist the user in filling out this field correctly.</p>

  <h2>Pagination</h2>
  <h3>default</h3>
  <PostPagination page={1} pageSize={10} collectionSize={100} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page" slot="post-pagination" data-version="10.0.0-next.67" data-hydrated=""></PostPagination>

  <h3>many-pages</h3>
  <PostPagination page={10} pageSize={6} collectionSize={200} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page" slot="post-pagination" data-version="10.0.0-next.67" data-hydrated=""></PostPagination>

  <h3>page-out-of-range</h3>
  <PostPagination page={50} pageSize={10} collectionSize={40} label="Pagination" textPrevious="Previous page" textNext="Next page" textPage="Page" textFirst="First page" textLast="Last page" slot="post-pagination" data-version="10.0.0-next.67" data-hydrated=""></PostPagination>

  <h2>Popover</h2>
  <h3>default</h3>
  <PostPopoverTrigger for="popover-one" data-version="10.0.0-next.67" data-hydrated="">
      <button className="btn btn-secondary" aria-expanded="false" aria-haspopup="true" aria-controls="popover-one">Popover Trigger</button>
    </PostPopoverTrigger>
    <PostPopover className="palette palette-accent" id="popover-one" placement="top" textClose="Close" arrow={true} data-version="10.0.0-next.67">
       <h2 className="h6">Optional title</h2> 
      <p className="mb-0">A longer message that needs more time to read. <a href="#">Links</a> are also possible.</p>
    </PostPopover>

  <h3>wrapped</h3>
  <PostPopoverTrigger data-version="10.0.0-next.67" data-hydrated="">
        <button className="btn btn-secondary" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true" aria-controls="">Popover Trigger</button>
        <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={true} data-version="10.0.0-next.67" data-hydrated="">
          <h2 className="h6">Optional title</h2>
          <p className="mb-0">
            A longer message that needs more time to read. <a href="#">Links</a> are also possible.
          </p>
        </PostPopover>
      </PostPopoverTrigger>

  <h3>info-icon</h3>
  <label> Tracking updates </label>
      <PostPopoverTrigger data-version="10.0.0-next.67">
        <button className="btn btn-link btn-icon" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true" aria-controls="">
          <PostIcon aria-hidden="true" name="info" data-version="10.0.0-next.67" data-hydrated="" />
          <span className="visually-hidden">See more information</span>
        </button>
        <PostPopover className="palette palette-accent" placement="top" textClose="Close" arrow={true} data-version="10.0.0-next.67">
          <p className="mb-0">
            Follow your letter's journey with automatic updates at key delivery milestones.
          </p>
        </PostPopover>
      </PostPopoverTrigger>

  <h2>Rating</h2>
  <h3>default</h3>
  <PostRating label="Rating" data-version="10.0.0-next.67" data-hydrated="" />

  <h3>readonly</h3>
  <PostRating label="Rating" currentRating={3} readonly={true} data-version="10.0.0-next.67" data-hydrated=""></PostRating>

  <h2>Stepper</h2>
  <h3>default</h3>
  <PostStepper textCompletedStep="Completed step" textCurrentStep="Current step" textStepNumber="Step #number:" currentIndex={2} data-version="10.0.0-next.67" data-hydrated="">
       <PostStepperItem className="stepper-item-completed" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 1 label</PostStepperItem>  <PostStepperItem className="stepper-item-completed" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 2 label</PostStepperItem>  <PostStepperItem className="stepper-item-current stepper-item-selected" data-version="10.0.0-next.67" role="listitem" data-hydrated="" aria-current="step" aria-live="polite"> Step 3 label</PostStepperItem>  <PostStepperItem className="stepper-item-inactive stepper-item-after-current" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 4 label</PostStepperItem>  <PostStepperItem className="stepper-item-inactive" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 5 label</PostStepperItem> 
    </PostStepper>

  <h3>selected</h3>
  <PostStepper textCompletedStep="Completed step" textCurrentStep="Current step" textStepNumber="Step #number:" currentIndex={3} data-version="10.0.0-next.67" data-hydrated="">
       <PostStepperItem className="stepper-item-completed" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 1 label</PostStepperItem>  <PostStepperItem className="stepper-item-completed" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 2 label</PostStepperItem>  <PostStepperItem className="stepper-item-completed" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 3 label</PostStepperItem>  <PostStepperItem className="stepper-item-current stepper-item-selected" data-version="10.0.0-next.67" role="listitem" data-hydrated="" aria-current="step" aria-live="polite"> Step 4 label</PostStepperItem>  <PostStepperItem className="stepper-item-inactive stepper-item-after-current" data-version="10.0.0-next.67" role="listitem" data-hydrated=""> Step 5 label</PostStepperItem> 
    </PostStepper>

  <h2>Tabs</h2>
  <h3>default</h3>
  <PostTabs data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-jUVskw" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="true" tabindex="0" className="tab-title" data-hydrated="" aria-controls="panel-8zWJhd">First tab</PostTabItem>
      <PostTabItem name="second" id="tab-CM3AuL" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-mzm5dV">Second tab</PostTabItem>
      <PostTabItem name="third" id="tab-ANkSxO" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-XesHFW">Third tab</PostTabItem>
      <PostTabPanel for="first" data-version="10.0.0-next.67" id="panel-8zWJhd" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-jUVskw" style={{ display: 'block' }}>
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second" data-version="10.0.0-next.67" id="panel-mzm5dV" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-CM3AuL">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third" data-version="10.0.0-next.67" id="panel-XesHFW" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-ANkSxO">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>panels-variant</h3>
  <PostTabs data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-DRLbP3" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="true" tabindex="0" className="tab-title" data-hydrated="" aria-controls="panel-mIpj7C">First tab</PostTabItem>
      <PostTabItem name="second" id="tab-94bfKf" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-GoZZy4">Second tab</PostTabItem>
      <PostTabItem name="third" id="tab-IxioRk" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-c9G7AY">Third tab</PostTabItem>
      <PostTabPanel for="first" data-version="10.0.0-next.67" id="panel-mIpj7C" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-DRLbP3" style={{ display: 'block' }}>
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second" data-version="10.0.0-next.67" id="panel-GoZZy4" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-94bfKf">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third" data-version="10.0.0-next.67" id="panel-c9G7AY" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-IxioRk">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>active-tab</h3>
  <PostTabs activeTab="second" data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-Okj3_D" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-jAm0N8">First tab</PostTabItem>
      <PostTabItem name="second" id="tab-ae7taV" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="true" tabindex="0" className="tab-title" data-hydrated="" aria-controls="panel-d5m6gf">Second tab</PostTabItem>
      <PostTabItem name="third" id="tab-VfIikn" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-tTNprd">Third tab</PostTabItem>
      <PostTabPanel for="first" slot="panels" data-version="10.0.0-next.67" id="panel-jAm0N8" role="tabpanel" data-hydrated="" aria-labelledby="tab-Okj3_D">
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second" data-version="10.0.0-next.67" id="panel-d5m6gf" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-ae7taV" style={{ display: 'block' }}>
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third" aria-labelledby="tab-VfIikn" slot="panels" data-version="10.0.0-next.67" id="panel-tTNprd" role="tabpanel" data-hydrated="">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>

  <h3>full-width</h3>
  <div className="container">
    <PostTabs fullWidth={true} data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-FbWwzL" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="true" tabindex="0" className="tab-title" data-hydrated="" aria-controls="panel-JCkXBR">First tab</PostTabItem>
      <PostTabItem name="second" id="tab-JRmmy4" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-i-ts7w">Second tab</PostTabItem>
      <PostTabItem name="third" id="tab-qzL1SG" role="tab" data-version="10.0.0-next.67" data-navigation-mode="false" aria-selected="false" tabindex="-1" className="tab-title" data-hydrated="" aria-controls="panel-dAYAMT">Third tab</PostTabItem>
      <PostTabPanel for="first" data-version="10.0.0-next.67" id="panel-JCkXBR" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-FbWwzL" style={{ display: 'block' }}>
        This is the content of the first tab. By default it is shown initially.
      </PostTabPanel>
      <PostTabPanel for="second" data-version="10.0.0-next.67" id="panel-i-ts7w" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-JRmmy4">
        This is the content of the second tab. By default it is hidden initially.
      </PostTabPanel>
      <PostTabPanel for="third" data-version="10.0.0-next.67" id="panel-dAYAMT" role="tabpanel" slot="panels" data-hydrated="" aria-labelledby="tab-qzL1SG">
        This is the content of the third tab. By default it is also hidden initially.
      </PostTabPanel>
    </PostTabs>
  </div>

  <h3>navigation-full-width</h3>
  <div className="container">
    <PostTabs fullWidth={true} label="Tabs navigation" data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-PYvUHD" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/first" aria-current="page">First page</a>
      </PostTabItem>
      <PostTabItem name="second" id="tab-CHj2Gf" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/second">Second page</a>
      </PostTabItem>
      <PostTabItem name="third" id="tab-eFCVTc" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/third">Third page</a>
      </PostTabItem>
    </PostTabs>
  </div>

  <h3>navigation-variant</h3>
  <PostTabs label="Tabs navigation" data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="first" id="tab-Uf61sC" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/first" aria-current="page">First page</a>
      </PostTabItem>
      <PostTabItem name="second" id="tab-wSyE4q" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/second">Second page</a>
      </PostTabItem>
      <PostTabItem name="third" id="tab-eA7pYw" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/third">Third page</a>
      </PostTabItem>
    </PostTabs>

  <h3>active-navigation-item</h3>
  <PostTabs label="Tabs navigation" data-version="10.0.0-next.67" data-hydrated="">
      <PostTabItem name="letters" id="tab-XFW5Rw" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/letters">Letters</a>
      </PostTabItem>
      <PostTabItem name="packages" id="tab-UE4wzs" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/packages" aria-current="page">Packages</a>
      </PostTabItem>
      <PostTabItem name="logistics" id="tab-QOFWbK" data-version="10.0.0-next.67" data-navigation-mode="true" className="nav-item" data-hydrated="">
        <a href="/logistics">Logistics</a>
      </PostTabItem>
      </PostTabs>

  <h2>Togglebutton</h2>
  <h3>default</h3>
  <PostTogglebutton className="btn btn-primary" data-version="10.0.0-next.67" role="button" tabindex="0" aria-pressed="false" data-hydrated="">
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

  <h3>initially-toggled</h3>
  <PostTogglebutton className="btn btn-primary" toggled={true} data-version="10.0.0-next.67" role="button" tabindex="0" aria-pressed="true" data-hydrated="">
      <span data-showwhen="untoggled">Untoggled</span>
      <span data-showwhen="toggled">Toggled</span>
    </PostTogglebutton>

  <h3>content-visibility</h3>
  <PostTogglebutton className="btn btn-primary" data-version="10.0.0-next.67" role="button" tabindex="0" aria-pressed="false" data-hydrated="">
        Menu
        <span data-showwhen="untoggled"><PostIcon name="burger" data-version="10.0.0-next.67" data-hydrated="" /></span>
        <span data-showwhen="toggled"><PostIcon name="closex" data-version="10.0.0-next.67" data-hydrated="" /></span>
      </PostTogglebutton>

  <h2>Tooltip</h2>
  <h3>default</h3>
  <PostTooltipTrigger for="tooltip-one" data-version="10.0.0-next.67" data-hydrated="">
      <button className="btn btn-secondary btn-large" aria-describedby="tooltip-one">Button</button></PostTooltipTrigger>
    <PostTooltip id="tooltip-one" className="palette palette-accent" placement="top" data-version="10.0.0-next.67">
      Hi there 👋
    </PostTooltip>

  <h3>non-focusable</h3>
  <PostTooltipTrigger for="tooltip-non-focusable" delay={650} data-version="10.0.0-next.67" data-hydrated="">
        <cite tabindex="0" aria-describedby="tooltip-non-focusable">This is a cite element with a tooltip on it.</cite>
      </PostTooltipTrigger>
      <PostTooltip className="hydrated" id="tooltip-non-focusable" placement="top" data-version="10.0.0-next.67">
        This is not the link you are looking for
      </PostTooltip>

  <h3>multiple</h3>
  <PostTooltipTrigger for="tooltip-multiple" delay={650} data-version="10.0.0-next.67" data-hydrated="">
        <button className="btn btn-secondary btn-large" aria-describedby="tooltip-multiple">Tooltip button</button>
      </PostTooltipTrigger>
      <PostTooltipTrigger for="tooltip-multiple" delay={650} data-version="10.0.0-next.67" data-hydrated="">
        <button className="btn btn-secondary btn-large" aria-describedby="tooltip-multiple">Same tooltip, different button</button>
      </PostTooltipTrigger>
      <PostTooltip id="tooltip-multiple" className="hydrated bg-" placement="top" data-version="10.0.0-next.67">
        I'm the same, no matter what
      </PostTooltip>

  <h2>TooltipTrigger</h2>
  <PostTooltipTrigger for="tooltip-cd684d90-e7a7-41a9-8923-b1b72ad9b385--default" delay={300} data-version="10.0.0-next.67" data-hydrated="">
        <button className="btn btn-secondary btn-large" aria-describedby="tooltip-cd684d90-e7a7-41a9-8923-b1b72ad9b385--default">Tooltip with delay</button>
      </PostTooltipTrigger>
      <PostTooltip id="tooltip-cd684d90-e7a7-41a9-8923-b1b72ad9b385--default" data-version="10.0.0-next.67"> This is the tooltip content </PostTooltip>
      <h2>React Server Icons</h2>
      <div className="d-flex gap-16 flex-wrap">
        <figure>
          <PostIconLetter className="fs-2"></PostIconLetter>
          <figcaption>Line Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetterSolid className="fs-2"></PostIconLetterSolid>
          <figcaption>Solid Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter style={{ color: 'red' }} className="fs-2"></PostIconLetter>
          <figcaption>Colored Icon</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-3"></PostIconLetter>
          <figcaption>Sized Icon</figcaption>
        </figure>
        <figure>
          <PostIconExplosives flipH={true} className="fs-2"></PostIconExplosives>
          <figcaption>Flipped Horizontally</figcaption>
        </figure>
        <figure>
          <PostIconExplosives className="fs-2" flipV={true}></PostIconExplosives>
          <figcaption>Flipped Vertically</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" rotate={90}></PostIconLetter>
          <figcaption>Rotated</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" scale={1.5}></PostIconLetter>
          <figcaption>Scaled</figcaption>
        </figure>
        <figure>
          <PostIconLetter className="fs-2" animation={'spin'}></PostIconLetter>
          <figcaption>Spinning</figcaption>
        </figure>
      </div>
    </>
  );
}
