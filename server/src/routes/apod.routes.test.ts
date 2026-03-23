import { describe, expect, test } from "@jest/globals";

import apodRouter from "./apod.routes";

describe("APOD Router", () => {
  test("should export a router", () => {
    expect(apodRouter).toBeDefined();
    expect(typeof apodRouter).toBe("function");
  });

  test("should have GET route for /", () => {
    const routes = apodRouter.stack.map((layer) => layer.route).filter((route) => route);

    const getRoute = routes.find((route) => route?.path === "/" && route.get);
    expect(getRoute).toBeDefined();
  });
});
