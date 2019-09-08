# What's this?

The Space Simulator is a simple project to simulate the stars in the space.

# How to use?

- Create a SpaceManager
- Create Star(s)
- Use `SpaceManager.born(star)` to add new star in space
- Create StaticStar(s) witch will not change(position, mass, density) during the simulation
- use `Spacemanager.add(staticStar)` to add StaticStar in space (you can add more then one sun, you know?)

# Configuration

In the `config.js` change the value you want to change:

- *G* the gravity constant, default 9.8
- *TIME_RATE* how far the time flows, default 1.0

---
# 这是什么？

太空模拟器是一个用于模拟天体在太空中受重力作用而进行运动的模拟器

# 如何使用？

- 创建一个SpaceManager
- 创建Star(星体)
- 使用方法`SpaceManager.born(star)` 将你的star添加到你的太空之中
- 创建StaticStar(静态天体) （在模拟过程中位置、质量、密度等不会变的天体）
- 使用`Spacemanager.add(staticStar)` 将staticStar添加进你的太空种(你可以加入多个恒星)

注：如果要模拟多星系统，还得使用Star而不是StaticStar

# 配置

在文件`config.js`种改变你想要改变的配置：

- *G* 重力常数，默认 9.8
- *TIME_RATE* 时间流速，默认 1.0