import React, { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import "./switch.css";

export default function SwitchComponent({
    checked,
    onChange,
    label,
    enabled,
    align='flex-end'
}) {

  return (
      <div className="row" style={{ gap: '5px', justifyContent: align }}>
        <Switch.Root 
            className="SwitchRoot" 
            checked={checked}
            onCheckedChange={(value) => { if(onChange != null) onChange(value) }}
            disabled={!enabled}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
        <label
          className="Label text-montserrat text-10 text-weight-5"
          htmlFor="airplane-mode"
          style={{ paddingRight: 15 }}
        >
          {label}
        </label>
      </div>
  );
}
