// ui-com/packages/components/index.ts
import { ADialogForm } from "./ADialogForm";

const components = [ADialogForm];

const install = (app: any) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export { ADialogForm };

export default {
  install,
};
