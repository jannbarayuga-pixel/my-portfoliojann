/**
 * Custom JavaScript Scrollbar - Simplified Version
 * - Turquoise scrollbar thumb
 * - Completely transparent track
 * - Hover effect (red color)
 */
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure everything is loaded
    setTimeout(initScrollbar, 100);
    
    function initScrollbar() {
        // Create elements
        const scrollbar = document.createElement('div');
        scrollbar.className = 'custom-scrollbar';
        
        const scrollThumb = document.createElement('div');
        scrollThumb.className = 'scrollbar-thumb';
        
        // Add to DOM
        scrollbar.appendChild(scrollThumb);
        document.body.appendChild(scrollbar);
        
        // Variables
        let isDragging = false;
        let startY = 0;
        let startScroll = 0;
        
        // Calculate and set thumb size
        function setThumbSize() {
            const scrollRatio = window.innerHeight / document.documentElement.scrollHeight;
            const thumbHeight = Math.max(scrollRatio * window.innerHeight, 40);
            scrollThumb.style.height = thumbHeight + 'px';
        }
        
        // Set thumb position based on scroll
        function updateThumbPosition() {
            if (!isDragging) {
                const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
                const thumbPosition = scrollPercent * (window.innerHeight - scrollThumb.offsetHeight);
                scrollThumb.style.top = thumbPosition + 'px';
            }
        }
        
        // Initialize
        setThumbSize();
        updateThumbPosition();
        
        // Event listeners
        window.addEventListener('scroll', updateThumbPosition);
        window.addEventListener('resize', function() {
            setThumbSize();
            updateThumbPosition();
        });
        
        // Dragging functionality - CRITICAL PART
        scrollThumb.addEventListener('mousedown', function(e) {
            // Prevent defaults
            e.preventDefault();
            e.stopPropagation();
            
            // Set dragging state
            isDragging = true;
            startY = e.clientY;
            startScroll = window.pageYOffset;
            
            // Store the initial thumb position
            const initialThumbTop = parseInt(scrollThumb.style.top || '0', 10);
            
            // Visual feedback
            scrollThumb.classList.add('active');
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
            
            // Drag function - defined inside mousedown to access initial positions
            function drag(e) {
                if (!isDragging) return;
                
                // Prevent defaults
                e.preventDefault();
                e.stopPropagation();
                
                // Calculate how far the mouse has moved
                const deltaY = e.clientY - startY;
                
                // Move the thumb directly with the mouse
                const newThumbPosition = initialThumbTop + deltaY;
                
                // Constrain thumb position to scrollbar bounds
                const maxTop = window.innerHeight - scrollThumb.offsetHeight;
                const boundedPosition = Math.max(0, Math.min(newThumbPosition, maxTop));
                
                // Update thumb position visually
                scrollThumb.style.top = boundedPosition + 'px';
                
                // Calculate and set scroll position based on thumb position
                const scrollRatio = boundedPosition / maxTop;
                const newScrollPosition = scrollRatio * (document.documentElement.scrollHeight - window.innerHeight);
                
                // Apply scroll
                window.scrollTo(0, newScrollPosition);
            }
            
            // Stop dragging
            function stopDrag(e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                isDragging = false;
                scrollThumb.classList.remove('active');
                document.body.style.userSelect = '';
                document.body.style.cursor = '';
                
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('mouseup', stopDrag);
            }
            
            // Add and remove events properly
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
        });
        
        // Track click
        scrollbar.addEventListener('click', function(e) {
            if (e.target !== scrollThumb) {
                const clickPosition = e.clientY;
                const scrollbarTop = scrollbar.getBoundingClientRect().top;
                const clickPercent = (clickPosition - scrollbarTop) / window.innerHeight;
                
                window.scrollTo({
                    top: clickPercent * (document.documentElement.scrollHeight - window.innerHeight),
                    behavior: 'smooth'
                });
            }
        });
    }
}); 