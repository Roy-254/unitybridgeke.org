import { describe, it, expect } from "vitest";
import { formatCurrency, generateSlug } from "@/lib/utils";

describe("Utility Functions", () => {
    describe("formatCurrency", () => {
        it("should format KES correctly", () => {
            expect(formatCurrency(1000, "KES")).toContain("KES");
            expect(formatCurrency(1000, "KES")).toContain("1,000");
        });

        it("should format USD correctly", () => {
            expect(formatCurrency(10.5, "USD")).toContain("$10.50");
        });
    });

    describe("generateSlug", () => {
        it("should convert title to slug", () => {
            expect(generateSlug("Unity Bridge Kenya")).toBe("unity-bridge-kenya");
        });

        it("should handle special characters", () => {
            expect(generateSlug("Unity Bridge & Co!")).toBe("unity-bridge-co");
        });
    });
});
