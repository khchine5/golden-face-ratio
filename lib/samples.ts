const CELEBA =
  "https://huggingface.co/datasets/harpreetsahota/celebamask-hq/resolve/main/data/";

const celebUrl = (i: number) =>
  `${CELEBA}data_${Math.floor(i / 1000)}/${i}.jpg`;

export type Sample = {
  name: string;
  url: string;
};

export const SAMPLES: Sample[] = [
  { name: "CelebA-HQ 0000", url: celebUrl(0) },
  { name: "CelebA-HQ 0042", url: celebUrl(42) },
  { name: "CelebA-HQ 0137", url: celebUrl(137) },
  { name: "CelebA-HQ 0268", url: celebUrl(268) },
  { name: "CelebA-HQ 0391", url: celebUrl(391) },
  { name: "CelebA-HQ 0512", url: celebUrl(512) },
  { name: "CelebA-HQ 0673", url: celebUrl(673) },
  { name: "CelebA-HQ 0815", url: celebUrl(815) },
  { name: "CelebA-HQ 0947", url: celebUrl(947) },
  { name: "CelebA-HQ 1024", url: celebUrl(1024) },
  { name: "CelebA-HQ 1433", url: celebUrl(1433) },
  { name: "CelebA-HQ 1899", url: celebUrl(1899) },
  { name: "CelebA-HQ 2356", url: celebUrl(2356) },
  { name: "CelebA-HQ 2871", url: celebUrl(2871) },
  { name: "CelebA-HQ 3390", url: celebUrl(3390) },
  { name: "CelebA-HQ 4455", url: celebUrl(4455) },
  { name: "CelebA-HQ 5678", url: celebUrl(5678) },
  { name: "CelebA-HQ 7123", url: celebUrl(7123) },
  { name: "CelebA-HQ 8999", url: celebUrl(8999) },
  { name: "CelebA-HQ 12345", url: celebUrl(12345) },
];
