const SIZES = [16, 24, 32, 40, 48, 64];

function dataRetriever() {
  return {
    isLoading: false,
    filterShowSet: '1',
    sizes: SIZES,
    v1IconNames: [],
    v2IconNames: [],
    getIcon(name) {
      return `<use href="/post-icons/${name}.svg?v=${new Date().getTime()}#i-${name}"/>`;
    },
    async getData() {
      this.isLoading = true;

      const report = await (await fetch('/report.json')).json();
      const iconNames = report.icons.map(icon => icon.file.basename);

      this.v1IconNames = iconNames.filter(name => /^(\d){4}$/.test(name));
      this.v2IconNames = iconNames.filter(name => !/^(\d){4}$/.test(name));

      this.isLoading = false;
    },
  };
}
