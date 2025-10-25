declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
