window.onload = updateDiskCount;

function cleanUp() {
    console.log(document.querySelectorAll('.disk'));
    document.querySelectorAll('.disk').forEach(e => e.remove()); // Added . before disk
    console.log("Cleaned up disks.");
}

function updateDiskCount() {
    cleanUp();
    const diskCount = document.getElementById("diskCount").value;
    document.getElementById("diskValue").textContent = diskCount;
    
    const beginRod = document.getElementById("rod1").parentElement;
    const existingDisks = beginRod.querySelectorAll('.disk');
    
    // Colors for the disks
    const colors = ['#FF595E', '#4CAF50', '#2196F3', '#FA2F52', '#FF9800', '#FFEB3B', '#00BCD4', '#795548'];
    
    // Remove existing disks
    existingDisks.forEach(disk => disk.remove());

    // Add new disks
    for (let i = 0; i < parseInt(diskCount); i++) {
        const disk = document.createElement('div');
        disk.className = 'disk onRod1';
        disk.style.bottom = `${i * 25 + 20}px`;  
        disk.style.width = `${180 - (i * 20)}px`;
        disk.style.background = colors[i];
        disk.id = i;
        beginRod.appendChild(disk);
    }
}

async function towerOfHanoi(from_rod, to_rod, aux_rod, n) {
    // Get n from parameter instead of DOM
    if (!n) {
        n = parseInt(document.getElementById("diskValue").textContent);
    }
    
    if (n <= 0) {
        console.log("Invalid number of disks.");
        return;
    }
    
    if (n === 1) {
        console.log(`Move disk 1 from rod ${from_rod} to rod ${to_rod}`);
        moveDisk(from_rod, to_rod, n);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait after move
        return;
    }
    
    await towerOfHanoi(from_rod, aux_rod, to_rod, n - 1);
    console.log(`Move disk ${n} from rod ${from_rod} to rod ${to_rod}`);
    moveDisk(from_rod, to_rod, n);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait after move
    
    await towerOfHanoi(aux_rod, to_rod, from_rod, n - 1);
}

function moveDisk(from_rod, to_rod, n) {
    // make n equivalent to correct ids#
    n = document.getElementById("diskValue").innerHTML - n + 1;

    // Get DOM elements
    const newParentID = 'tower' + to_rod.slice(3);
    const newParent = document.getElementById(newParentID);
    const diskElement = document.getElementById(n-1);
    const oldParent = diskElement.parentElement;
    
    // Update classes for rod assignment
    diskElement.classList.remove('onR' + from_rod.slice(1, 4));
    diskElement.classList.add('onR' + to_rod.slice(1, 4));
    
    // Move disk to new parent
    oldParent.removeChild(diskElement);
    newParent.appendChild(diskElement);
    
    // Calculate new height: (number of disks below) * disk height + base offset
    const disksBelow = Array.from(newParent.children)
        .filter(child => child.classList.contains('disk'))
        .length - 1;
    const diskHeight = 25; // height of each disk
    const baseOffset = 20; // offset from rod base
    
    // Set new position
    diskElement.style.bottom = `${disksBelow * diskHeight + baseOffset}px`;
}