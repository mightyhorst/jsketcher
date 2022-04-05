import {ApplicationContext} from 'context';
import {roundValueForPresentation as r} from 'cad/craft/operationHelper';
import {EntityKind} from "cad/model/entities";
import {BooleanDefinition} from "cad/craft/schema/common/BooleanDefinition";
import {OperationDescriptor} from "cad/craft/operationPlugin";
import CSys from "math/csys";
import {MDatum} from "cad/model/mdatum";


interface PrimitiveBoxParams {
  x: Number,
  y: Number,
  z: Number,
  locations: MDatum,
  boolean: BooleanDefinition,
}

export const PrimitiveBoxOperation: OperationDescriptor<PrimitiveBoxParams> = {
  id: 'BOX',
  label: 'Box',
  icon: 'img/cad/cube',
  info: 'Primitive Box',
  paramsInfo: ({x, y, z}) => `(${r(x)} , ${r(y)} , ${r(z)})`,
  form: [
    {
      type: 'number',
      label: 'X',
      name: 'x',
      defaultValue: 50,
    },
    {
      type: 'number',
      label: 'Y',
      name: 'y',
      defaultValue: 50,
    },
    {
      type: 'number',
      label: 'Z',
      name: 'z',
      defaultValue: 50,
    },
    {
      type: 'selection',
      name: 'locations',
      capture: [EntityKind.DATUM],
      label: 'locations',
      multi: false,
      optional: true,
      defaultValue: {
        usePreselection: true,
        preselectionIndex: 0
      },
    },

    {
      type: 'boolean',
      name: 'boolean',
      label: 'boolean',
      optional: true,
    }

  ],


  run: (params: PrimitiveBoxParams, ctx: ApplicationContext) => {

    let occ = ctx.occService;
    const oci = occ.commandInterface;

    const csys = params.locations?.csys || CSys.ORIGIN;

    oci.box("box",
      "-min", csys.origin.x, csys.origin.y, csys.origin.z,
      "-size", params.x, params.y, params.z,
      "-dir", csys.z.x, csys.z.y, csys.z.z,
      "-xdir", csys.x.x, csys.x.y, csys.x.z
    );

    return occ.utils.applyBooleanModifier(["box"], params.boolean);

  },
}
