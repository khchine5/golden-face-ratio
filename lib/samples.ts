export type Sample = {
  name: string;
  url: string;
};

const ids = [
  0, 42, 137, 268, 391, 512, 673, 815, 947, 1024, 1433, 1899, 2356, 2871,
  3390, 4455, 5678, 7123, 8999, 12345,
];

export const SAMPLES: Sample[] = ids.map((id) => ({
  name: `CelebA-HQ ${String(id).padStart(4, "0")}`,
  url: `/samples/${String(id).padStart(5, "0")}.jpg`,
}));
