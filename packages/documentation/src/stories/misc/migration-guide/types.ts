export interface V45Checks {
  general: {
    naming_cwfpackagename: boolean;
    naming_entryfiles: boolean;
    naming_cwflicense: boolean;
    naming_cwfname: boolean;
    naming_options: boolean;
    variables_isolatecomponents: boolean;
    variables_fontsizemap: boolean;
    variables_lineheightrg: boolean;
    variables_floatinglabel: boolean;
    variables_colorsremoved: boolean;
    variables_colorsrenamed: boolean;
    variables_lineheigts: boolean;
    variables_lineheightlighter: boolean;
    variables_headingfontsizes: boolean;
    mixins_fontsizelineheight: boolean;
    classes_bgopacity: boolean;
    classes_secondary: boolean;
    classes_rtlmode: boolean;
    classes_sronly: boolean;
  };
  bootstrap: {
    alerts_closebuttoncontent: boolean;
    alerts_closebuttonclass: boolean;
    badges_classes: boolean;
    backgrounds_textcolor: boolean;
    blockquotes_footerstructure: boolean;
    blockquotes_qclass: boolean;
    buttons_outline: boolean;
    buttons_borderradius: boolean;
    buttons_borderradius2: boolean;
    buttons_invertedclass: boolean;
    buttons_iconclass: boolean;
    buttonclose_content: boolean;
    buttonclose_class: boolean;
    buttonclose_buttonclasses: boolean;
    cards_classes: boolean;
    forms_formlabelclass: boolean;
    forms_formgroup: boolean;
    forms_formtext: boolean;
    formcontrols_formfloatingwrapper: boolean;
    formcontrols_formfloatingcontrollgclass: boolean;
    formselects_formfloatingwrapper: boolean;
    formselects_classes: boolean;
    formselects_formfloatingselectlgclass: boolean;
    formtextareas_formfloatingwrapper: boolean;
    formtextareas_formfloatingcontrollgclass: boolean;
    formfiles_formfloatingwrapper: boolean;
    formfiles_formfloatingcontrollgclass: boolean;
    formfiles_formlabelclass: boolean;
    formcheckboxes_classes: boolean;
    formcheckboxes_validationclasses: boolean;
    formcheckboxes_validationfeedbackclasses: boolean;
    formradios_classes: boolean;
    formradios_validationclasses: boolean;
    formradios_validationfeedbackclasses: boolean;
    formswitches_classes: boolean;
    formswitches_labelclasses: boolean;
    formswitches_validationclasses: boolean;
    formswitches_validationfeedbackclasses: boolean;
  };
  ngbootstrap: {
    buttons_labelclass: boolean;
    buttons_inputclass: boolean;
    buttons_grouptoggleclass: boolean;
    datepickers_variables: boolean;
    modals_closebuttoncontent: boolean;
    modals_closebuttonclass: boolean;
  };
  jquery: {
    accordions_removed: boolean;
  };
  post: {
    accordions_removed: boolean;
    customselects_formfloatingwrapper: boolean;
    customselects_classes: boolean;
    customselects_menuclass: boolean;
    subnavigations_invertedclass: boolean;
    topicteasers_imageattributes: boolean;
    topicteasers_imagecontainergridclasses: boolean;
    topicteasers_contentcontainergridclasses: boolean;
    topicteasers_linklistfontcurve: boolean;
  };
}

export interface V910Checks {
  general: {
    hide_automigration: boolean;
  };
  ngbootstrap: {
    removed_components: boolean;
  };
  forms: {
    tooltip_validation: boolean;
    input_sizes: boolean;
    form_text: boolean;
  };
  grid: {
    breakpoints: boolean;
    gutter: boolean;
    gap: boolean;
  };
  utilities: {
    percentage_sizing: boolean;
    removed_pixel_sizing: boolean;
    renamed_pixel_sizing: boolean;
    max_size: boolean;
    shadow: boolean;
    elevation: boolean;
    removed_spacing: boolean;
    renamed_spacing: boolean;
    background: boolean;
    renamed_various_utilities: boolean;
    removed_various_utilities: boolean;
    border_radius: boolean;
    position_helper: boolean;
    text_color: boolean;
  };
  typography: {
    font_sizes_variables: boolean;
    font_sizes_classes: boolean;
    font_curves_classes: boolean;
    font_curves_variables: boolean;
    line_height_variables: boolean;
    weight_light: boolean;
    font_weight: boolean;
    monospace: boolean;
  };
  others: {
    card: boolean;
    card_group: boolean;
    button_regular: boolean;
    button_animated: boolean;
    icon_pi: boolean;
    breadcrumb_item: boolean;
    alert_fixed_bottom: boolean;
    topic_teaser: boolean;
    chip: boolean;
    accent_colors: boolean;
    spinner_sizes: boolean;
    standard_html_alert: boolean;
    spinner: boolean;
    dialog_icon: boolean;
    popover_trigger: boolean;
  };
  components: {
    alert: boolean;
    accordion_heading: boolean;
    hydrated_flag: boolean;
    accordion_item_part: boolean;
  };
}

export interface GlobalStateData {
  currentVersion: number;
  environment: string;
  angular: boolean;
}
