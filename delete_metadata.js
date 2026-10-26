import sharp from "sharp";
import path from "path";
import fs from "fs";

const INPUT_IMAGE = "./images/dream.jpg";
const OUTPUT_IMAGE = "./images/clean.jpg";

async function runMetadataTest() {
  try {
    if (!fs.existsSync(INPUT_IMAGE)) {
      console.error(
        `❌ Error: Could not find the image in this path you enter. Please make sure it's placed here.`,
      );
      return;
    }

    console.log("🔍 Reading original image metadata...");
    const originalMetadata = await sharp(INPUT_IMAGE).metadata();

    // Log found metadata blocks
    const foundBlocks = [];
    if (originalMetadata.exif) foundBlocks.push(`EXIF (${originalMetadata.exif.length} bytes)`);
    if (originalMetadata.icc) foundBlocks.push("ICC Profile");
    if (originalMetadata.xmp) foundBlocks.push(`XMP (${originalMetadata.xmp.length} bytes)`);
    if (originalMetadata.iptc) foundBlocks.push(`IPTC (${originalMetadata.iptc.length} bytes)`);

    if (foundBlocks.length > 0) {
      console.log(`✅ Found metadata in original file: ${foundBlocks.join(", ")}`);
    } else {
      console.log("⚠️ No standard metadata found in this specific file.");
    }
    console.log("--------------------------------------------------");

    console.log("⚡ Processing image (Stripping metadata)...");
    // Sharp strips all metadata by default unless .keepMetadata() is explicitly called
    await sharp(INPUT_IMAGE).toFile(OUTPUT_IMAGE);

    console.log(`💾 Cleaned image saved as: ${OUTPUT_IMAGE}`);
    console.log("--------------------------------------------------");

    console.log("🔍 Verifying clean image metadata...");
    const cleanMetadata = await sharp(OUTPUT_IMAGE).metadata();

    // Comprehensive check for all potentially remaining metadata blocks
    const hasRemainingMetadata = 
      !!cleanMetadata.exif || 
      !!cleanMetadata.icc || 
      !!cleanMetadata.xmp || 
      !!cleanMetadata.iptc;

    if (!hasRemainingMetadata) {
      console.log("🎉 SUCCESS: Metadata has been verified as completely stripped!");
    } else {
      console.log("❌ FAILED: Some metadata blocks are still present.");
      if (cleanMetadata.exif) console.log("- EXIF data remained.");
      if (cleanMetadata.icc) console.log("- ICC Profile remained.");
      if (cleanMetadata.xmp) console.log("- XMP data remained.");
      if (cleanMetadata.iptc) console.log("- IPTC data remained.");
    }
  } catch (error) {
    console.error("💥 An error occurred during the test:", error.message);
  }
}

runMetadataTest();