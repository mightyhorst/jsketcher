import {ApplicationContext} from 'context';
import {roundValueForPresentation as r} from 'cad/craft/operationHelper';
import {EntityKind} from "cad/model/entities";
import {BooleanDefinition} from "cad/craft/schema/common/BooleanDefinition";
import {OperationDescriptor} from "cad/craft/operationPlugin";
import {MDatum} from "cad/model/mdatum";
import CSys from "math/csys";


interface PrimitiveSphereParams {
  radius: number,
  locations: MDatum,
  boolean: BooleanDefinition,
}

export const PrimitiveSphereOperation: OperationDescriptor<PrimitiveSphereParams> = {
  id: 'SPHERE',
  label: 'Sphere',
  icon: 'img/cad/sphere',
  info: 'Primitive Sphere',
  paramsInfo: ({radius,}) => `(${r(radius)}  )`,
  form: [
    {
      type: 'number',
      label: 'Radius',
      name: 'radius',
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


  run: (params: PrimitiveSphereParams, ctx: ApplicationContext) => {

    let occ = ctx.occService;
    const oci = occ.commandInterface;

    const csys = params.locations?.csys || CSys.ORIGIN;
    oci.plane("csys",
      csys.origin.x,
      csys.origin.y,
      csys.origin.z,
      csys.x.x,
      csys.x.y,
      csys.x.z,
      csys.y.x,
      csys.y.y,
      csys.y.z);

    oci.psphere("Sphere", "csys", params.radius);

    return occ.utils.applyBooleanModifier(["Sphere"], params.boolean);

  },
}
