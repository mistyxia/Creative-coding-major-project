# Creative coding major project
## Group Work
![An image of Group Work Reference](assets/Pacita%20Abad%20Wheels%20of%20fortune.jpg)
_Wheels of fortune by Pacita Abad_

![An image of Group Work Reference](assets/Group%20Work.png)
_Group Work Final edition_

## Indivitual Work
### Instructions
My work uses a time-based approach. After the user enters the page, the shapes on the screen will start to change after a 2-second wait. The larger circular images will grow or shrink over a period of time, while the smaller shapes will also change their forms. After 3 seconds, all the shapes will update their colours and positions.

### Details of my individual work
**I chose time to animating my individual work.**

**Commit1:**
1. Added noLoop() in the setup() function.
2. Added a setTimeout() function in the setup() function: Every time the user enter this interface the animation will start in 2 seconds.
3. Removed The original noLoop() from the draw() function:

![An image of commit1](assets/version1.gif)

**Commit2:**
1. Added a global variable points to store the generated points.
2. Modified the draw() function to animate the points when they exist.
3. Used the sin() function to periodically change p.z, making it grow and shrink over a 3-second period.
4. Used setInterval(updatePoints, 3000) to update the positions and sizes of the points every 3 seconds.

![An image of commit2](assets/version2.gif)