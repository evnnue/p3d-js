// Initialize embed api
const p3d = new P3dEmbedApi(document.getElementById('p3d-embed'));
p3d.listVariants().then((variantSets) => {
    document.getElementById('container').style.display = 'block';
    document.getElementById('loading').style.opacity = '0.0';
    document.getElementById('loading').style.visibility = 'hidden';
    // Display a set in the UI by index
    const displaySet = (setIndex) => {
        for (let i = 0; i < variantSets.length; i++) {
            const isActive = i === setIndex;
            // Only display options for the selected set
            const setOptions = document.getElementById(`variantset-${i}`);
            setOptions.style.display = isActive ? 'flex' : 'none';
            // Mark button active
            const setButton = document.getElementById(`variantset-${i}-button`);
            if (isActive) {
                setButton.classList.add('active');
            }
            else {
                setButton.classList.remove('active');
            }
        }
    };
    // Initially display first set
    displaySet(0);
    variantSets.forEach((variantSet, setIndex) => {
        const setButton = document.getElementById(`variantset-${setIndex}-button`);
        setButton.onclick = () => {
            displaySet(setIndex);
        };
        variantSet.variants.forEach((variant, variantIndex) => {
            const variantButton = document.getElementById(`variant-${setIndex}-button-${variantIndex}`);
            variantButton.onclick = function () {
                variant.select();
            };
        });
    });
});
// Add spin toggle button
const spinToggle = document.getElementById('spin-toggle');
function toggleSpin() {
    p3d.getSpin().then((didSpin) => {
        const newSpin = !didSpin;
        if (newSpin) {
            spinToggle.classList.add('active');
        }
        else {
            spinToggle.classList.remove('active');
        }
        p3d.setSpin(newSpin);
    });
}
spinToggle.onclick = toggleSpin;
// Spin by default
toggleSpin();