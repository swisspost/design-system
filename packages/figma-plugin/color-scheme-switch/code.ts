type ColorScheme = 'light' | 'dark' | null;

interface UIDataObject {
  currentScheme?: ColorScheme;
}

const WINDOW_WIDTH = 300;
const WINDOW_HEIGHT = 200;
const COLOR_SCHEME_PAGE_COLLECTION_NAME = 'SchemePage';
const COLOR_SCHEME_COLLECTION_NAME = 'Scheme';
const DEFAULT_SCHEME: ColorScheme = 'light';
const STATIC_COMPONENT_NODE_TYPES = ['INSTANCE', 'COMPONENT'];
const STATIC_COMPONENT_NAMES = ['Palette'];

class SPDSColorSchemeSwitchPlugin {
  private collections: VariableCollection[] = [];
  private selectedFrame: FrameNode | null = null;

  get schemePageCollection(): VariableCollection | undefined {
    return this.collections.find(c => c.name === COLOR_SCHEME_PAGE_COLLECTION_NAME);
  }

  get schemePageMode() {
    const cId: string = this.schemePageCollection?.id ?? '';
    const mId: string | undefined =
      this.selectedFrame?.resolvedVariableModes[cId] ||
      this.selectedFrame?.explicitVariableModes[cId];
    const mode = this.schemePageCollection?.modes.find(m => m.modeId === mId);

    return {
      id: mId,
      name: mode?.name ?? null,
      colorScheme: (mode?.name?.toLowerCase() ?? null) as ColorScheme,
    };
  }

  get schemeCollection(): VariableCollection | undefined {
    return this.collections.find(c => c.name === COLOR_SCHEME_COLLECTION_NAME);
  }

  get schemeMode() {
    const cId: string = this.schemeCollection?.id ?? '';
    const mId: string | undefined =
      this.selectedFrame?.resolvedVariableModes[cId] ||
      this.selectedFrame?.explicitVariableModes[cId];
    const mode = this.schemeCollection?.modes.find(m => m.modeId === mId);

    return {
      id: mId,
      name: mode?.name ?? null,
      colorScheme: (mode?.name?.toLowerCase() ?? null) as ColorScheme,
    };
  }

  get hasSchemeCollections(): boolean {
    return this.schemePageCollection !== undefined && this.schemeCollection !== undefined;
  }

  get hasSchemeModes(): boolean {
    return this.schemePageMode.colorScheme !== null && this.schemeMode.colorScheme !== null;
  }

  constructor() {
    figma.showUI(__html__);
    figma.ui.resize(WINDOW_WIDTH, WINDOW_HEIGHT);

    this.listen();

    this.setup();
  }

  listen() {
    figma.ui.onmessage = ({ type, data }) => {
      switch (type) {
        case 'scheme:change':
          this.updateScheme(data.colorScheme);
          break;
      }
    };
  }

  emit(type: string, data: UIDataObject): void {
    figma.ui.postMessage({ type, data });
  }

  setup(): void {
    figma.on('selectionchange', this.updateSelection.bind(this));

    figma.variables
      .getLocalVariableCollectionsAsync()
      .then(collections => {
        this.collections = collections;

        if (!this.hasSchemeCollections) {
          figma.notify('SPDS Error: Color Scheme Variable Collections are missing.');
          return;
        }

        this.updateSelection();
      })
      .catch(error => {
        figma.notify('SPDS Error: Fetching variable collections:', error);
      });
  }

  updateSelection(): void {
    let node = figma.currentPage.selection[0];

    while (node && node.type !== 'FRAME') {
      node = node.parent as SceneNode;
    }

    // update selected frame
    this.selectedFrame = node as FrameNode | null;

    // set page scheme on selectedFrame if not yet defined
    if (!this.hasSchemeModes) {
      this.updateScheme(DEFAULT_SCHEME);
    }

    this.emit('scheme:update', {
      currentScheme: this.schemePageMode.colorScheme,
    });
  }

  updateScheme(colorScheme: ColorScheme): void {
    if (this.selectedFrame && this.hasSchemeCollections) {
      const pC = this.schemePageCollection!;
      const pModeId = pC.modes.find(m => m.name.toLowerCase() === colorScheme)!.modeId;
      this.selectedFrame.setExplicitVariableModeForCollection(pC, pModeId);

      const sC = this.schemeCollection!;
      const sModeId = sC.modes.find(m => m.name.toLowerCase() === colorScheme)!.modeId;
      this.selectedFrame.setExplicitVariableModeForCollection(sC, sModeId);
    }

    this.updateStaticComponents();
  }

  updateStaticComponents(): void {
    // ugly as hell, with a lot of potential for optimization, but works for now
    if (this.selectedFrame && this.hasSchemeCollections) {
      const cId = this.schemeCollection?.id ?? '';

      this.selectedFrame
        .findAll(node => {
          const containsMode: boolean =
            (this.selectedFrame?.resolvedVariableModes[cId] ||
              this.selectedFrame?.explicitVariableModes[cId]) !== undefined;

          return (
            STATIC_COMPONENT_NODE_TYPES.some(t => t === node.type) &&
            STATIC_COMPONENT_NAMES.some(n => n === node.name) &&
            containsMode
          );
        })
        .forEach(async component => {
          const bgId: string | undefined = component.boundVariables?.fills?.[0]?.id;
          const bg: Variable | null = await figma.variables.getVariableByIdAsync(bgId ?? '');
          // evaluate selected palette by background fill variable name
          const basename = (bg?.name ?? '').replace(/-bg$/, '');

          figma.variables
            .getVariableCollectionByIdAsync(bg?.variableCollectionId ?? '')
            .then((bgCollection: VariableCollection | null) => {
              bgCollection?.variableIds.forEach(async id => {
                figma.variables.getVariableByIdAsync(id).then((variable: Variable | null) => {
                  if (
                    variable?.resolvedType === 'STRING' &&
                    variable?.name === `${basename}-color-scheme`
                  ) {
                    // evaluate current scheme by schemePageMode
                    const schemeMode = variable.valuesByMode[
                      this.schemePageMode.id ?? ''
                    ] as string;

                    const sC = this.schemeCollection!;
                    const sModeId = sC.modes.find(m => m.name.toLowerCase() === schemeMode)!.modeId;

                    component.setExplicitVariableModeForCollection(sC, sModeId);
                  }
                });
              });
            });
        });
    }
  }
}

new SPDSColorSchemeSwitchPlugin();
