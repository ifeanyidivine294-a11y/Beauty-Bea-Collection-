import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const imagesDir = path.resolve('public/images');
const srcImagesDir = path.resolve('src/assets/images');

fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

// 1. Process CEO photograph to ceo-beauty-bea.png
const ceoSrc = path.resolve('src/assets/images/ceo_beauty_bea_1794051002069.jpg');
if (fs.existsSync(ceoSrc)) {
  await sharp(ceoSrc).png({ quality: 95 }).toFile(path.join(publicDir, 'ceo-beauty-bea.png'));
  await sharp(ceoSrc).png({ quality: 95 }).toFile(path.join(imagesDir, 'ceo-beauty-bea.png'));
  console.log('Processed CEO image to ceo-beauty-bea.png');
}

// 2. Process UI presentation to beauty-bea-ui-presentation.png
const presSrc = path.resolve('src/assets/images/beauty_bea_ui_presentation_1794051004026.jpg');
if (fs.existsSync(presSrc)) {
  await sharp(presSrc).png({ quality: 95 }).toFile(path.join(publicDir, 'beauty-bea-ui-presentation.png'));
  await sharp(presSrc).png({ quality: 95 }).toFile(path.join(imagesDir, 'beauty-bea-ui-presentation.png'));
  console.log('Processed Presentation image to beauty-bea-ui-presentation.png');
}

// 3. Create Brand Logos (beauty-bea-logo.svg, beauty-bea-logo.png, beauty-bea-logo-dark.png)
const createLogoSvg = (isDark = false) => `
<svg width="600" height="180" viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="berryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B51F63" />
      <stop offset="100%" stop-color="#92174F" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C07B" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
  </defs>
  <!-- Monogram BB Icon -->
  <g transform="translate(30, 25)">
    <circle cx="65" cy="65" r="58" fill="none" stroke="${isDark ? '#E9B7C9' : '#B51F63'}" stroke-width="2.5" opacity="0.6"/>
    <circle cx="65" cy="65" r="54" fill="none" stroke="${isDark ? '#FFF9F5' : '#17131B'}" stroke-width="1" opacity="0.3"/>
    
    <!-- First B (Berry) -->
    <path d="M 48 35 L 68 35 C 77 35, 84 41, 84 49 C 84 55, 80 60, 74 62 C 82 64, 88 71, 88 80 C 88 90, 80 97, 68 97 L 48 97 Z" 
          fill="none" stroke="url(#berryGrad)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="58" y1="36" x2="58" y2="96" stroke="url(#berryGrad)" stroke-width="3"/>
    
    <!-- Interlocking Second B (Ink / White) -->
    <path d="M 62 43 L 78 43 C 85 43, 91 48, 91 55 C 91 60, 87 64, 82 66 C 89 68, 95 74, 95 82 C 95 90, 88 95, 78 95 L 62 95" 
          fill="none" stroke="${isDark ? '#FFF9F5' : '#17131B'}" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
          
    <!-- Small Diamond Sparkle -->
    <path d="M 65 24 L 67 29 L 72 31 L 67 33 L 65 38 L 63 33 L 58 31 L 63 29 Z" fill="${isDark ? '#E9B7C9' : '#B51F63'}"/>
  </g>

  <!-- Typography -->
  <g transform="translate(180, 50)">
    <text x="0" y="42" font-family="'Cormorant Garamond', 'Playfair Display', Georgia, serif" font-size="44" font-weight="600" letter-spacing="4" fill="${isDark ? '#FFF9F5' : '#17131B'}">
      BEAUTY <tspan fill="#B51F63">BEA</tspan>
    </text>
    <text x="3" y="75" font-family="'Manrope', -apple-system, sans-serif" font-size="14" font-weight="500" letter-spacing="9" fill="${isDark ? '#E9B7C9' : '#77717A'}">
      COLLECTION
    </text>
    <line x1="160" y1="71" x2="330" y2="71" stroke="${isDark ? '#E9B7C9' : '#EDE5E9'}" stroke-width="1.5" />
  </g>
</svg>`;

const lightSvg = createLogoSvg(false);
const darkSvg = createLogoSvg(true);

fs.writeFileSync(path.join(publicDir, 'beauty-bea-logo.svg'), lightSvg);
fs.writeFileSync(path.join(imagesDir, 'beauty-bea-logo.svg'), lightSvg);

await sharp(Buffer.from(lightSvg)).png().toFile(path.join(publicDir, 'beauty-bea-logo.png'));
await sharp(Buffer.from(lightSvg)).png().toFile(path.join(imagesDir, 'beauty-bea-logo.png'));

await sharp(Buffer.from(darkSvg)).png().toFile(path.join(publicDir, 'beauty-bea-logo-dark.png'));
await sharp(Buffer.from(darkSvg)).png().toFile(path.join(imagesDir, 'beauty-bea-logo-dark.png'));
console.log('Generated brand logos');

// 4. Generate 16 high resolution studio product photographs
// Detailed SVG specifications for each product to create pristine, realistic studio product images
const products = [
  // BAGS
  {
    filename: 'product-bag-01.png',
    title: 'The Executive Tote',
    category: 'HANDBAGS',
    colorName: 'Noir Black',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F5EFEA"/>
            <stop offset="100%" stop-color="#EBE4DE"/>
          </radialGradient>
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(23,19,27,0.35)"/>
            <stop offset="60%" stop-color="rgba(23,19,27,0.12)"/>
            <stop offset="100%" stop-color="rgba(23,19,27,0)"/>
          </radialGradient>
          <linearGradient id="blackLeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2D2930"/>
            <stop offset="40%" stop-color="#1A171D"/>
            <stop offset="100%" stop-color="#0E0C10"/>
          </linearGradient>
          <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFEAA7"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#997C1E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bg)"/>
        <!-- Studio Pedestal Floor -->
        <ellipse cx="400" cy="650" rx="280" ry="45" fill="url(#shadow)"/>
        
        <!-- Handles -->
        <path d="M 310 380 C 300 210, 490 210, 480 380" fill="none" stroke="#1A171D" stroke-width="26" stroke-linecap="round"/>
        <path d="M 310 380 C 300 210, 490 210, 480 380" fill="none" stroke="#2E2833" stroke-width="12" stroke-linecap="round"/>
        
        <!-- Handle hardware rings -->
        <rect x="295" y="370" width="30" height="24" rx="6" fill="url(#goldBrass)"/>
        <rect x="465" y="370" width="30" height="24" rx="6" fill="url(#goldBrass)"/>

        <!-- Main Structured Tote Body -->
        <path d="M 230 380 L 560 380 L 610 630 L 180 630 Z" fill="url(#blackLeather)" />
        
        <!-- Center Trapeze Flap / Stitch Detail -->
        <path d="M 260 410 L 530 410 L 565 620 L 225 620 Z" fill="#151217" opacity="0.6"/>
        <path d="M 265 415 L 525 415 L 560 615 L 230 615 Z" fill="none" stroke="#443D48" stroke-width="2" stroke-dasharray="6,4"/>

        <!-- Gold Lock Clasp -->
        <rect x="375" y="450" width="40" height="32" rx="4" fill="url(#goldBrass)"/>
        <circle cx="395" cy="466" r="6" fill="#17131B"/>
        <rect x="365" y="510" width="60" height="8" rx="2" fill="url(#goldBrass)"/>
        <text x="395" y="525" font-family="'Manrope', sans-serif" font-size="7" font-weight="700" letter-spacing="2" fill="#D4AF37" text-anchor="middle">BEAUTY BEA</text>
        
        <!-- Bottom Base Corners -->
        <path d="M 180 620 L 220 620 L 210 630 L 180 630 Z" fill="url(#goldBrass)" opacity="0.7"/>
        <path d="M 610 620 L 570 620 L 580 630 L 610 630 Z" fill="url(#goldBrass)" opacity="0.7"/>
      </svg>
    `
  },
  {
    filename: 'product-bag-02.png',
    title: 'Bella Structured Handbag',
    category: 'HANDBAGS',
    colorName: 'Cognac Brown',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FAF3EE"/>
            <stop offset="100%" stop-color="#EFE4DC"/>
          </radialGradient>
          <radialGradient id="shadow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(35,20,10,0.3)"/>
            <stop offset="60%" stop-color="rgba(35,20,10,0.1)"/>
            <stop offset="100%" stop-color="rgba(35,20,10,0)"/>
          </radialGradient>
          <linearGradient id="brownLeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9C5B32"/>
            <stop offset="40%" stop-color="#7B4320"/>
            <stop offset="100%" stop-color="#552B11"/>
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE082"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#8D6E18"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bg2)"/>
        <ellipse cx="400" cy="650" rx="260" ry="42" fill="url(#shadow2)"/>
        
        <!-- Curved Rigid Top Handle -->
        <path d="M 320 370 C 310 240, 480 240, 470 370" fill="none" stroke="#663416" stroke-width="24" stroke-linecap="round"/>
        <path d="M 320 370 C 310 240, 480 240, 470 370" fill="none" stroke="#9C5B32" stroke-width="12" stroke-linecap="round"/>
        <rect x="306" y="360" width="28" height="24" rx="4" fill="url(#gold)"/>
        <rect x="456" y="360" width="28" height="24" rx="4" fill="url(#gold)"/>
        
        <!-- Trapezoid Kelly-style Body -->
        <path d="M 270 370 L 520 370 L 570 630 L 220 630 Z" fill="url(#brownLeather)"/>
        
        <!-- Flap -->
        <path d="M 270 370 L 520 370 L 510 490 L 280 490 Z" fill="#663416"/>
        <path d="M 280 480 L 510 480" stroke="url(#gold)" stroke-width="4"/>
        
        <!-- Turn-lock closure -->
        <rect x="375" y="465" width="40" height="28" rx="6" fill="url(#gold)"/>
        <rect x="390" y="470" width="10" height="18" rx="3" fill="#3D1D09"/>
        
        <!-- Subtle Saddle Stitching -->
        <path d="M 280 380 L 290 480" stroke="#D7A17A" stroke-width="1.8" stroke-dasharray="5,4"/>
        <path d="M 510 380 L 500 480" stroke="#D7A17A" stroke-width="1.8" stroke-dasharray="5,4"/>
      </svg>
    `
  },
  {
    filename: 'product-bag-03.png',
    title: 'Classic Noir Shoulder Bag',
    category: 'HANDBAGS',
    colorName: 'Noir Quilted',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg3" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F2EEF5"/>
            <stop offset="100%" stop-color="#E5DFEB"/>
          </radialGradient>
          <radialGradient id="shadow3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,10,25,0.3)"/>
            <stop offset="60%" stop-color="rgba(15,10,25,0.1)"/>
            <stop offset="100%" stop-color="rgba(15,10,25,0)"/>
          </radialGradient>
          <linearGradient id="goldChain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE599"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#8F711C"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bg3)"/>
        <ellipse cx="400" cy="650" rx="270" ry="40" fill="url(#shadow3)"/>
        
        <!-- Interwoven Gold & Black Chain Strap Droop -->
        <path d="M 280 430 C 260 220, 530 220, 510 430" fill="none" stroke="url(#goldChain)" stroke-width="16" stroke-dasharray="14,10"/>
        <path d="M 280 430 C 260 220, 530 220, 510 430" fill="none" stroke="#17131B" stroke-width="6"/>
        
        <!-- Rectangular Flap Bag Body -->
        <rect x="220" y="420" width="350" height="210" rx="20" fill="#1C1821"/>
        
        <!-- Diamond Quilted Pattern -->
        <g stroke="#37313F" stroke-width="2" opacity="0.8">
          <line x1="240" y1="430" x2="430" y2="620"/>
          <line x1="310" y1="430" x2="500" y2="620"/>
          <line x1="380" y1="430" x2="560" y2="610"/>
          <line x1="550" y1="430" x2="360" y2="620"/>
          <line x1="480" y1="430" x2="290" y2="620"/>
          <line x1="410" y1="430" x2="230" y2="610"/>
        </g>
        
        <!-- Envelope Flap Trim -->
        <path d="M 220 420 L 570 420 L 570 540 L 400 580 L 220 540 Z" fill="#151219"/>
        <path d="M 220 540 L 400 580 L 570 540" fill="none" stroke="#2D2733" stroke-width="4"/>
        
        <!-- Interlocking Gold BB Emblem -->
        <circle cx="400" cy="565" r="22" fill="url(#goldChain)"/>
        <circle cx="400" cy="565" r="18" fill="#17131B"/>
        <text x="400" y="572" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="700" fill="#D4AF37" text-anchor="middle">BB</text>
      </svg>
    `
  },
  {
    filename: 'product-bag-04.png',
    title: 'Emerald Mini Crossbody',
    category: 'HANDBAGS',
    colorName: 'Royal Emerald',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg4" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#EDF7F2"/>
            <stop offset="100%" stop-color="#DFEFE6"/>
          </radialGradient>
          <radialGradient id="shadow4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(8,60,40,0.3)"/>
            <stop offset="60%" stop-color="rgba(8,60,40,0.1)"/>
            <stop offset="100%" stop-color="rgba(8,60,40,0)"/>
          </radialGradient>
          <linearGradient id="emeraldLeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0E9F73"/>
            <stop offset="40%" stop-color="#087F5B"/>
            <stop offset="100%" stop-color="#044D37"/>
          </linearGradient>
          <linearGradient id="gold4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFEAA7"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#997C1E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bg4)"/>
        <ellipse cx="400" cy="650" rx="230" ry="38" fill="url(#shadow4)"/>
        
        <!-- Slim Crossbody Strap -->
        <path d="M 330 400 C 270 200, 520 200, 460 400" fill="none" stroke="url(#gold4)" stroke-width="8"/>
        
        <!-- Curved Compact Crossbody Body -->
        <rect x="260" y="400" width="270" height="230" rx="30" fill="url(#emeraldLeather)"/>
        
        <!-- Flap with Gold Trim -->
        <path d="M 260 400 L 530 400 L 530 520 C 530 540, 400 560, 400 560 C 400 560, 260 540, 260 520 Z" fill="#066649"/>
        <path d="M 260 520 C 260 540, 400 560, 400 560 C 400 560, 530 540, 530 520" fill="none" stroke="url(#gold4)" stroke-width="3"/>
        
        <!-- Jewel Clasp -->
        <circle cx="400" cy="540" r="16" fill="url(#gold4)"/>
        <circle cx="400" cy="540" r="8" fill="#087F5B"/>
      </svg>
    `
  },

  // SHOES
  {
    filename: 'product-shoe-01.png',
    title: 'Signature Block Heels',
    category: 'SHOES',
    colorName: 'Midnight Noir',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgs1" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F5F0F2"/>
            <stop offset="100%" stop-color="#E8DFE4"/>
          </radialGradient>
          <radialGradient id="shadows1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(20,15,22,0.32)"/>
            <stop offset="60%" stop-color="rgba(20,15,22,0.1)"/>
            <stop offset="100%" stop-color="rgba(20,15,22,0)"/>
          </radialGradient>
          <linearGradient id="patentLeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3A3340"/>
            <stop offset="50%" stop-color="#1B1720"/>
            <stop offset="100%" stop-color="#0B090E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgs1)"/>
        <ellipse cx="400" cy="650" rx="270" ry="38" fill="url(#shadows1)"/>
        
        <!-- Architectural Block Heel -->
        <path d="M 240 470 L 290 470 L 285 640 L 235 640 Z" fill="#120F16"/>
        <rect x="235" y="632" width="50" height="8" rx="2" fill="#D4AF37"/>
        
        <!-- Shoe Arch and Insole -->
        <path d="M 235 480 C 280 490, 360 550, 480 590 L 590 635 L 530 640 C 430 630, 310 570, 240 480 Z" fill="#D8B49A"/>
        
        <!-- Shoe Upper (Vamp and Ankle Strap) -->
        <path d="M 240 470 C 270 410, 310 440, 330 500 C 370 540, 470 590, 560 615 C 600 625, 580 635, 540 638 C 450 630, 350 580, 240 470 Z" fill="url(#patentLeather)"/>
        
        <!-- Delicate Ankle Strap with Gold Buckle -->
        <path d="M 265 420 C 255 350, 350 330, 370 400" fill="none" stroke="url(#patentLeather)" stroke-width="12" stroke-linecap="round"/>
        <rect x="345" y="360" width="16" height="20" rx="3" fill="#D4AF37"/>
      </svg>
    `
  },
  {
    filename: 'product-shoe-02.png',
    title: 'Nude Elegance Pumps',
    category: 'SHOES',
    colorName: 'Blush Nude',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgs2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FAF1EC"/>
            <stop offset="100%" stop-color="#EFE0D7"/>
          </radialGradient>
          <radialGradient id="shadows2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(50,30,25,0.25)"/>
            <stop offset="60%" stop-color="rgba(50,30,25,0.08)"/>
            <stop offset="100%" stop-color="rgba(50,30,25,0)"/>
          </radialGradient>
          <linearGradient id="nudeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F2D1C1"/>
            <stop offset="50%" stop-color="#E2B7A0"/>
            <stop offset="100%" stop-color="#C5977E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgs2)"/>
        <ellipse cx="400" cy="650" rx="260" ry="36" fill="url(#shadows2)"/>
        
        <!-- Slender Stiletto Heel -->
        <path d="M 230 460 L 250 460 L 246 640 L 236 640 Z" fill="#996D55"/>
        <rect x="236" y="635" width="10" height="6" rx="1" fill="#17131B"/>
        
        <!-- Pointed Pump Upper -->
        <path d="M 220 450 C 270 420, 310 470, 380 540 C 440 580, 520 610, 620 635 C 570 642, 450 630, 360 590 C 280 550, 240 500, 220 450 Z" fill="url(#nudeGrad)"/>
        <!-- Inner Sole / Heel Cup -->
        <path d="M 225 455 C 240 480, 270 510, 320 535 C 290 510, 260 480, 240 460 Z" fill="#FFF2EC"/>
      </svg>
    `
  },
  {
    filename: 'product-shoe-03.png',
    title: 'Everyday Luxe Flats',
    category: 'SHOES',
    colorName: 'Metallic Gold',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgs3" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FAF5EA"/>
            <stop offset="100%" stop-color="#EFE8D6"/>
          </radialGradient>
          <radialGradient id="shadows3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(40,30,10,0.22)"/>
            <stop offset="60%" stop-color="rgba(40,30,10,0.08)"/>
            <stop offset="100%" stop-color="rgba(40,30,10,0)"/>
          </radialGradient>
          <linearGradient id="goldSandal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3C4"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#A6831A"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgs3)"/>
        <ellipse cx="400" cy="650" rx="270" ry="34" fill="url(#shadows3)"/>
        
        <!-- Flat Cushioned Sole -->
        <path d="M 180 620 C 230 610, 450 610, 610 625 C 620 635, 590 645, 540 645 C 380 645, 220 640, 180 630 Z" fill="#E8D5B5"/>
        <path d="M 180 620 C 230 610, 450 610, 610 625 L 610 630 C 450 615, 230 615, 180 625 Z" fill="#B38B42"/>
        
        <!-- Braided Gold Front Straps -->
        <path d="M 440 615 C 470 540, 550 540, 580 625" fill="none" stroke="url(#goldSandal)" stroke-width="18" stroke-linecap="round"/>
        <!-- Ankle / T-Strap with Buckle -->
        <path d="M 230 620 C 260 550, 340 550, 360 615" fill="none" stroke="url(#goldSandal)" stroke-width="12" stroke-linecap="round"/>
        <path d="M 290 550 L 480 560" stroke="url(#goldSandal)" stroke-width="10" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    filename: 'product-shoe-04.png',
    title: 'White Cloud Sneakers',
    category: 'SHOES',
    colorName: 'Pure White & Berry',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgs4" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F4F4F6"/>
            <stop offset="100%" stop-color="#E5E5EB"/>
          </radialGradient>
          <radialGradient id="shadows4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(25,25,35,0.22)"/>
            <stop offset="60%" stop-color="rgba(25,25,35,0.07)"/>
            <stop offset="100%" stop-color="rgba(25,25,35,0)"/>
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgs4)"/>
        <ellipse cx="400" cy="650" rx="270" ry="36" fill="url(#shadows4)"/>
        
        <!-- Thick Cloud Rubber Sole -->
        <path d="M 180 600 C 250 595, 450 595, 620 615 C 630 635, 590 650, 520 650 C 350 650, 210 645, 175 625 Z" fill="#F8F8FA"/>
        <path d="M 175 625 C 210 645, 350 650, 520 650 C 590 650, 630 635, 620 615 L 620 625 C 590 645, 520 658, 500 658 C 340 658, 200 650, 175 632 Z" fill="#D6D6DF"/>

        <!-- Premium Leather Sneaker Upper -->
        <path d="M 190 595 C 190 510, 240 450, 310 470 C 370 490, 420 540, 520 570 C 580 585, 615 595, 610 615 C 450 595, 250 595, 190 595 Z" fill="#FFFFFF" stroke="#E3E3EC" stroke-width="2"/>
        
        <!-- Berry Pink Heel Counter Tab -->
        <path d="M 190 520 C 195 480, 230 465, 250 495 C 230 520, 210 545, 195 560 Z" fill="#B51F63"/>
        
        <!-- Eyelets and Crisp White Laces -->
        <circle cx="370" cy="510" r="5" fill="#D4AF37"/>
        <circle cx="410" cy="525" r="5" fill="#D4AF37"/>
        <circle cx="450" cy="545" r="5" fill="#D4AF37"/>
        <line x1="365" y1="510" x2="400" y2="520" stroke="#F0F0F5" stroke-width="6" stroke-linecap="round"/>
        <line x1="405" y1="525" x2="445" y2="540" stroke="#F0F0F5" stroke-width="6" stroke-linecap="round"/>
      </svg>
    `
  },

  // JEWELRY
  {
    filename: 'product-jewelry-01.png',
    title: 'Golden Aura Necklace',
    category: 'JEWELRY',
    colorName: '18K Yellow Gold',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgj1" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FBF7F0"/>
            <stop offset="100%" stop-color="#ECE2D3"/>
          </radialGradient>
          <radialGradient id="shadowj1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(30,20,5,0.2)"/>
            <stop offset="60%" stop-color="rgba(30,20,5,0.06)"/>
            <stop offset="100%" stop-color="rgba(30,20,5,0)"/>
          </radialGradient>
          <linearGradient id="goldChains" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF5C2"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#937416"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgj1)"/>
        <ellipse cx="400" cy="620" rx="160" ry="25" fill="url(#shadowj1)"/>
        
        <!-- First Delicate Tier Chain -->
        <path d="M 260 220 C 270 380, 530 380, 540 220" fill="none" stroke="url(#goldChains)" stroke-width="5" stroke-dasharray="8,4"/>
        <!-- Small Solitaire Bead on First Tier -->
        <circle cx="400" cy="340" r="8" fill="url(#goldChains)"/>
        
        <!-- Second Tier Chain -->
        <path d="M 230 220 C 240 480, 560 480, 570 220" fill="none" stroke="url(#goldChains)" stroke-width="6" stroke-dasharray="10,5"/>
        <!-- Polished Gold Coin Medallion -->
        <circle cx="400" cy="460" r="26" fill="url(#goldChains)"/>
        <circle cx="400" cy="460" r="21" fill="none" stroke="#8E6E16" stroke-width="2"/>
        <path d="M 400 445 L 404 455 L 415 456 L 407 464 L 409 475 L 400 469 L 391 475 L 393 464 L 385 456 L 396 455 Z" fill="#FFEAA7"/>

        <!-- Third Tier Long Bar Pendant -->
        <path d="M 200 220 C 210 590, 590 590, 600 220" fill="none" stroke="url(#goldChains)" stroke-width="7" stroke-dasharray="12,6"/>
        <rect x="394" y="540" width="12" height="60" rx="6" fill="url(#goldChains)"/>
      </svg>
    `
  },
  {
    filename: 'product-jewelry-02.png',
    title: 'Pearl Essence Earrings',
    category: 'JEWELRY',
    colorName: 'Lustrous Pearl & Gold',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgj2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F8F3F6"/>
            <stop offset="100%" stop-color="#EBE2E7"/>
          </radialGradient>
          <radialGradient id="shadowj2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(30,10,20,0.2)"/>
            <stop offset="60%" stop-color="rgba(30,10,20,0.06)"/>
            <stop offset="100%" stop-color="rgba(30,10,20,0)"/>
          </radialGradient>
          <radialGradient id="pearl" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#FFF7F9"/>
            <stop offset="80%" stop-color="#E8DFE5"/>
            <stop offset="100%" stop-color="#CBB8C4"/>
          </radialGradient>
          <linearGradient id="earringGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFEAA7"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#997C1E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgj2)"/>
        <ellipse cx="290" cy="620" rx="70" ry="18" fill="url(#shadowj2)"/>
        <ellipse cx="510" cy="620" rx="70" ry="18" fill="url(#shadowj2)"/>
        
        <!-- Left Earring -->
        <g transform="translate(0, 0)">
          <!-- Gold Ear Hook -->
          <path d="M 290 250 C 270 200, 310 200, 310 260 L 290 340" fill="none" stroke="url(#earringGold)" stroke-width="8" stroke-linecap="round"/>
          <circle cx="290" cy="340" r="10" fill="url(#earringGold)"/>
          <!-- Gold Filigree Cap -->
          <path d="M 265 370 C 275 350, 305 350, 315 370 Z" fill="url(#earringGold)"/>
          <!-- Baroque Freshwater Drop Pearl -->
          <ellipse cx="290" cy="460" rx="55" ry="75" fill="url(#pearl)"/>
        </g>

        <!-- Right Earring -->
        <g transform="translate(220, 0)">
          <path d="M 290 250 C 270 200, 310 200, 310 260 L 290 340" fill="none" stroke="url(#earringGold)" stroke-width="8" stroke-linecap="round"/>
          <circle cx="290" cy="340" r="10" fill="url(#earringGold)"/>
          <path d="M 265 370 C 275 350, 305 350, 315 370 Z" fill="url(#earringGold)"/>
          <ellipse cx="290" cy="460" rx="55" ry="75" fill="url(#pearl)"/>
        </g>
      </svg>
    `
  },
  {
    filename: 'product-jewelry-03.png',
    title: 'Crystal Elegance Bracelet',
    category: 'JEWELRY',
    colorName: 'Faceted Silver Crystal',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgj3" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F2F3F7"/>
            <stop offset="100%" stop-color="#DFE2EC"/>
          </radialGradient>
          <radialGradient id="shadowj3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,20,35,0.22)"/>
            <stop offset="60%" stop-color="rgba(15,20,35,0.06)"/>
            <stop offset="100%" stop-color="rgba(15,20,35,0)"/>
          </radialGradient>
          <linearGradient id="silverShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="50%" stop-color="#D8DCE3"/>
            <stop offset="100%" stop-color="#9AA0AE"/>
          </linearGradient>
          <radialGradient id="gem" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="40%" stop-color="#E8F4FD"/>
            <stop offset="80%" stop-color="#A9C7DF"/>
            <stop offset="100%" stop-color="#6F92AD"/>
          </radialGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgj3)"/>
        <ellipse cx="400" cy="550" rx="220" ry="50" fill="url(#shadowj3)"/>
        
        <!-- Elegant Coiled Tennis Bracelet -->
        <ellipse cx="400" cy="450" rx="210" ry="110" fill="none" stroke="url(#silverShine)" stroke-width="20"/>
        
        <!-- Sparkling Crystal Pavé Links -->
        <g>
          ${Array.from({ length: 28 }).map((_, i) => {
            const angle = (i / 28) * Math.PI * 2;
            const x = 400 + Math.cos(angle) * 210;
            const y = 450 + Math.sin(angle) * 110;
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="url(#gem)" stroke="#FFFFFF" stroke-width="2"/>`;
          }).join('')}
        </g>
        
        <!-- Center Sparkle Clasp -->
        <rect x="382" y="330" width="36" height="24" rx="4" fill="url(#silverShine)" stroke="#FFFFFF"/>
        <polygon points="400,320 405,335 420,340 405,345 400,360 395,345 380,340 395,335" fill="#FFFFFF"/>
      </svg>
    `
  },
  {
    filename: 'product-jewelry-04.png',
    title: 'Royal Gold Jewelry Set',
    category: 'JEWELRY',
    colorName: '24K Royal Gold',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgj4" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FAF4EB"/>
            <stop offset="100%" stop-color="#EDE2D0"/>
          </radialGradient>
          <radialGradient id="shadowj4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(40,30,10,0.25)"/>
            <stop offset="60%" stop-color="rgba(40,30,10,0.08)"/>
            <stop offset="100%" stop-color="rgba(40,30,10,0)"/>
          </radialGradient>
          <linearGradient id="richGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF1B8"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#8C6F16"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgj4)"/>
        <ellipse cx="400" cy="650" rx="250" ry="35" fill="url(#shadowj4)"/>
        
        <!-- Regal Collar Torque -->
        <path d="M 230 310 C 250 530, 550 530, 570 310" fill="none" stroke="url(#richGold)" stroke-width="26" stroke-linecap="round"/>
        
        <!-- Textured Gold Cascading Droplets on Collar -->
        ${Array.from({ length: 15 }).map((_, i) => {
          const t = i / 14;
          const x = 270 + t * 260;
          const y = 370 + Math.sin(t * Math.PI) * 110;
          return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="url(#richGold)" stroke="#FFF1B8" stroke-width="2"/>`;
        }).join('')}
        
        <!-- Matching Droplet Earrings Flanking the Collar -->
        <g transform="translate(190, 480)">
          <circle cx="0" cy="0" r="8" fill="url(#richGold)"/>
          <line x1="0" y1="8" x2="0" y2="40" stroke="url(#richGold)" stroke-width="4"/>
          <ellipse cx="0" cy="65" rx="16" ry="26" fill="url(#richGold)"/>
        </g>
        <g transform="translate(610, 480)">
          <circle cx="0" cy="0" r="8" fill="url(#richGold)"/>
          <line x1="0" y1="8" x2="0" y2="40" stroke="url(#richGold)" stroke-width="4"/>
          <ellipse cx="0" cy="65" rx="16" ry="26" fill="url(#richGold)"/>
        </g>
      </svg>
    `
  },

  // PERFUMES
  {
    filename: 'product-perfume-01.png',
    title: 'Velvet Bloom EDP 100ml',
    category: 'PERFUMES',
    colorName: 'Petal Pink Glass',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgp1" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FAF0F4"/>
            <stop offset="100%" stop-color="#EEDDE6"/>
          </radialGradient>
          <radialGradient id="shadowp1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(181,31,99,0.25)"/>
            <stop offset="60%" stop-color="rgba(30,10,20,0.08)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
          <linearGradient id="roseLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F7C4D9"/>
            <stop offset="60%" stop-color="#E37FA7"/>
            <stop offset="100%" stop-color="#B51F63"/>
          </linearGradient>
          <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFE8DF"/>
            <stop offset="50%" stop-color="#E5A795"/>
            <stop offset="100%" stop-color="#B26C59"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgp1)"/>
        <ellipse cx="400" cy="670" rx="190" ry="32" fill="url(#shadowp1)"/>
        
        <!-- Crystal Faceted Perfume Stopper Cap -->
        <polygon points="340,220 460,220 490,280 310,280" fill="#FFFFFF" stroke="#E5D0DA" stroke-width="2" opacity="0.9"/>
        <polygon points="360,180 440,180 460,220 340,220" fill="#FFF2F7" stroke="#E5D0DA" stroke-width="2"/>
        
        <!-- Rose Gold Atomizer Collar -->
        <rect x="360" y="280" width="80" height="40" rx="4" fill="url(#roseGold)"/>
        
        <!-- Faceted Glass Flacon Body -->
        <polygon points="330,320 470,320 540,430 510,640 290,640 260,430" fill="url(#roseLiquid)" opacity="0.88"/>
        <!-- Glass reflections -->
        <polygon points="340,330 460,330 520,430 495,630 305,630 280,430" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.6"/>
        
        <!-- Gold Luxury Label -->
        <rect x="325" y="440" width="150" height="90" rx="6" fill="#FFF9F5" stroke="url(#roseGold)" stroke-width="2"/>
        <text x="400" y="475" font-family="'Cormorant Garamond', Georgia, serif" font-size="18" font-weight="700" fill="#17131B" text-anchor="middle">VELVET BLOOM</text>
        <text x="400" y="495" font-family="'Manrope', sans-serif" font-size="9" font-weight="600" letter-spacing="3" fill="#B51F63" text-anchor="middle">EAU DE PARFUM</text>
        <text x="400" y="515" font-family="'Manrope', sans-serif" font-size="8" fill="#77717A" text-anchor="middle">100 ML · BEAUTY BEA</text>
      </svg>
    `
  },
  {
    filename: 'product-perfume-02.png',
    title: 'Rose Affair EDP 50ml',
    category: 'PERFUMES',
    colorName: 'Crimson Rose',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgp2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#F8EEEE"/>
            <stop offset="100%" stop-color="#EAD7D7"/>
          </radialGradient>
          <radialGradient id="shadowp2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(180,20,40,0.22)"/>
            <stop offset="60%" stop-color="rgba(30,10,10,0.06)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
          <linearGradient id="redRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F27289"/>
            <stop offset="50%" stop-color="#C71D43"/>
            <stop offset="100%" stop-color="#7A0B22"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgp2)"/>
        <ellipse cx="400" cy="670" rx="170" ry="28" fill="url(#shadowp2)"/>
        
        <!-- Heavy Black Lacquer Cylindrical Cap -->
        <rect x="340" y="220" width="120" height="90" rx="12" fill="#17131B"/>
        <rect x="340" y="295" width="120" height="15" fill="#D4AF37"/>
        
        <!-- Cylindrical Glass Flacon -->
        <rect x="300" y="320" width="200" height="320" rx="30" fill="url(#redRose)" opacity="0.9"/>
        <rect x="310" y="330" width="180" height="300" rx="20" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/>
        
        <!-- Minimalist Cream Label -->
        <rect x="330" y="440" width="140" height="100" rx="4" fill="#FFFFFF"/>
        <text x="400" y="480" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="600" fill="#17131B" text-anchor="middle">ROSE AFFAIR</text>
        <text x="400" y="505" font-family="'Manrope', sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#C71D43" text-anchor="middle">50 ML</text>
      </svg>
    `
  },
  {
    filename: 'product-perfume-03.png',
    title: 'Amber Desire EDP 100ml',
    category: 'PERFUMES',
    colorName: 'Golden Honey Amber',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgp3" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#FBF4E8"/>
            <stop offset="100%" stop-color="#EFE0C5"/>
          </radialGradient>
          <radialGradient id="shadowp3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(120,70,10,0.28)"/>
            <stop offset="60%" stop-color="rgba(30,20,5,0.08)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
          <linearGradient id="amberGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFD68A"/>
            <stop offset="50%" stop-color="#D98A26"/>
            <stop offset="100%" stop-color="#7F4200"/>
          </linearGradient>
          <linearGradient id="metallicGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFEAA7"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#997C1E"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgp3)"/>
        <ellipse cx="400" cy="670" rx="190" ry="32" fill="url(#shadowp3)"/>
        
        <!-- Heavy Solid Gold Magnetic Cap -->
        <polygon points="340,210 460,210 470,290 330,290" fill="url(#metallicGold)"/>
        
        <!-- Architectural Heavy Base Glass Bottle -->
        <rect x="290" y="300" width="220" height="340" rx="18" fill="url(#amberGold)" opacity="0.92"/>
        <rect x="300" y="310" width="200" height="30" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.5"/>
        <!-- Heavy glass bottom base -->
        <rect x="290" y="580" width="220" height="60" rx="18" fill="#FFF2DA" opacity="0.5"/>
        
        <!-- Embossed Metal Plaque -->
        <rect x="330" y="420" width="140" height="90" rx="6" fill="#17131B" stroke="url(#metallicGold)" stroke-width="2"/>
        <text x="400" y="460" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-weight="600" fill="#D4AF37" text-anchor="middle">AMBER DESIRE</text>
        <text x="400" y="482" font-family="'Manrope', sans-serif" font-size="8" font-weight="600" letter-spacing="3" fill="#FFEAA7" text-anchor="middle">PARFUM DE LUXE</text>
        <text x="400" y="498" font-family="'Manrope', sans-serif" font-size="8" fill="#FFFFFF" text-anchor="middle">100 ML</text>
      </svg>
    `
  },
  {
    filename: 'product-perfume-04.png',
    title: 'Midnight Elegance EDP 50ml',
    category: 'PERFUMES',
    colorName: 'Smoky Noir Crystal',
    svg: `
      <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgp4" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="70%" stop-color="#EFEFF4"/>
            <stop offset="100%" stop-color="#DCDDE6"/>
          </radialGradient>
          <radialGradient id="shadowp4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(15,15,25,0.3)"/>
            <stop offset="60%" stop-color="rgba(15,15,25,0.08)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </radialGradient>
          <linearGradient id="midnightGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3A3845"/>
            <stop offset="40%" stop-color="#1B1A24"/>
            <stop offset="100%" stop-color="#09080E"/>
          </linearGradient>
          <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="50%" stop-color="#D0D3DB"/>
            <stop offset="100%" stop-color="#898D98"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#bgp4)"/>
        <ellipse cx="400" cy="670" rx="180" ry="30" fill="url(#shadowp4)"/>
        
        <!-- Polished Chrome Cap -->
        <rect x="350" y="230" width="100" height="70" rx="10" fill="url(#chrome)"/>
        
        <!-- Smoky Gradient Bottle Body -->
        <rect x="290" y="310" width="220" height="320" rx="24" fill="url(#midnightGlass)"/>
        <rect x="300" y="320" width="200" height="300" rx="16" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/>
        
        <!-- Silver Foil Text Directly on Glass -->
        <text x="400" y="470" font-family="'Cormorant Garamond', Georgia, serif" font-size="22" font-weight="600" fill="#FFFFFF" text-anchor="middle">MIDNIGHT</text>
        <text x="400" y="495" font-family="'Cormorant Garamond', Georgia, serif" font-size="20" font-style="italic" fill="#D4AF37" text-anchor="middle">Elegance</text>
        <line x1="360" y1="515" x2="440" y2="515" stroke="#FFFFFF" stroke-width="1" opacity="0.6"/>
        <text x="400" y="535" font-family="'Manrope', sans-serif" font-size="9" letter-spacing="3" fill="#D0D3DB" text-anchor="middle">50 ML EDP</text>
      </svg>
    `
  }
];

// Write and render all products into /public and /public/images
for (const p of products) {
  const svgBuf = Buffer.from(p.svg);
  await sharp(svgBuf).png({ quality: 95 }).toFile(path.join(publicDir, p.filename));
  await sharp(svgBuf).png({ quality: 95 }).toFile(path.join(imagesDir, p.filename));
  console.log(`Generated ${p.filename}`);
}

console.log('All 16 product images and brand assets generated successfully!');
