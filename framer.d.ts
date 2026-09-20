declare module "framer" {
  export const ControlType: {
    Boolean: "boolean";
    Image: "image";
    Number: "number";
    String: "string";
  };

  export function addPropertyControls(
    component: unknown,
    controls: Record<string, unknown>,
  ): void;
}
