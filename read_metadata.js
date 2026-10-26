import sharp from "sharp";
import ExifReader from "exif-reader";
import fs from "fs";

// CHANGE THIS to your target test file inside the "need" folder (e.g., "a.png", "photo.jpg", "test.webp")
const TEST_FILE = "./images/dream.jpg";

async function extractAllMetadata() {
  try {
    if (!fs.existsSync(TEST_FILE)) {
      console.error(
        `❌ Error: Could not find file at "${TEST_FILE}". Please verify the filename and folder path.`,
      );
      return;
    }

    console.log(`\n🔍 Parsing target image layout: ${TEST_FILE}`);
    const metadata = await sharp(TEST_FILE).metadata();

    console.log("\n📊 [1/2] CORE FILE PROPERTIES");
    console.log(`• Format:        ${metadata.format.toUpperCase()}`);
    console.log(`• Dimensions:    ${metadata.width}px x ${metadata.height}px`);
    console.log(`• Color Space:   ${metadata.space}`);
    console.log(
      `• Has Alpha:     ${metadata.hasAlpha ? "Yes (Transparent background support)" : "No"}`,
    );

    console.log("\n🕵️ [2/2] DEEP METADATA EXTRACTION");

    let metadataFound = false;

    // 1. Process EXIF Data (GPS, Camera Model, Creation Timestamps)
    if (metadata.exif) {
      metadataFound = true;
      console.log("\n✅ Embedded EXIF Records Found. Extracting key pairs...");
      try {
        const parsedExif = ExifReader(metadata.exif);

        // Print all parsed details out to the console
        console.dir(parsedExif, { depth: null, colors: true });
      } catch (parseError) {
        console.log("⚠️ Could not decode raw EXIF binary buffer:", parseError.message);
      }
    }

    // 2. Process XMP Data (Adobe Photoshop / Lightroom editing histories)
    if (metadata.xmp) {
      metadataFound = true;
      console.log("\n✅ Embedded XMP XML Profile Found (Editing platform history):");
      console.log(
        metadata.xmp.toString("utf8").slice(0, 1000) + "\n...[Truncated for length]",
      );
    }

    // 3. Process ICC Color Management Profiles
    if (metadata.icc) {
      metadataFound = true;
      console.log(
        `\n✅ Embedded ICC Calibration Profile Found (${metadata.icc.length} bytes matching physical display targets)`,
      );
    }

    if (!metadataFound) {
      console.log(
        "\nℹ️ Complete. This image has no hidden tracking tags, device signatures, or historic metadata profiles.",
      );
    }
  } catch (error) {
    console.error("\n💥 Error executing file metadata extraction:", error.message);
  }
}

extractAllMetadata();
