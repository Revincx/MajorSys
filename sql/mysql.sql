/*
 Source Server         : Docker
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : MajorSys

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 18/08/2021 15:35:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for choice
-- ----------------------------
DROP TABLE IF EXISTS `choice`;
CREATE TABLE `choice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gpa_value` double NULL DEFAULT NULL,
  `major_choice` int(11) NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `major_choice`(`major_choice`) USING BTREE,
  CONSTRAINT `major_choice` FOREIGN KEY (`major_choice`) REFERENCES `major` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of choice
-- ----------------------------

-- ----------------------------
-- Table structure for college
-- ----------------------------
DROP TABLE IF EXISTS `college`;
CREATE TABLE `college`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of college
-- ----------------------------
INSERT INTO `college` VALUES (1, '粮油食品学院');
INSERT INTO `college` VALUES (2, '生物工程学院');
INSERT INTO `college` VALUES (3, '环境工程学院');
INSERT INTO `college` VALUES (4, '化学化工学院');
INSERT INTO `college` VALUES (5, '机电工程学院');
INSERT INTO `college` VALUES (6, '电气工程学院');
INSERT INTO `college` VALUES (7, '信息科学与工程学院');
INSERT INTO `college` VALUES (8, '土木建筑学院');
INSERT INTO `college` VALUES (9, '理学院');
INSERT INTO `college` VALUES (10, '材料科学与工程学院');
INSERT INTO `college` VALUES (11, '经济贸易学院');
INSERT INTO `college` VALUES (12, '管理学院');
INSERT INTO `college` VALUES (13, '外语学院');
INSERT INTO `college` VALUES (14, '法学院');
INSERT INTO `college` VALUES (15, '新闻传播学院');
INSERT INTO `college` VALUES (16, '设计艺术学院');
INSERT INTO `college` VALUES (17, '人工智能与大数据学院');
INSERT INTO `college` VALUES (18, '国际教育学院');

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `college_id` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `college_major`(`college_id`) USING BTREE,
  CONSTRAINT `college_major` FOREIGN KEY (`college_id`) REFERENCES `college` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of major
-- ----------------------------
INSERT INTO `major` VALUES (1, 1, '食品科学与工程');
INSERT INTO `major` VALUES (2, 1, '食品质量与安全');
INSERT INTO `major` VALUES (3, 1, '粮食工程');
INSERT INTO `major` VALUES (4, 2, '生物工程');
INSERT INTO `major` VALUES (5, 2, '生物技术');
INSERT INTO `major` VALUES (6, 2, '制药工程');
INSERT INTO `major` VALUES (7, 2, '动物科学');
INSERT INTO `major` VALUES (8, 3, '环境工程');
INSERT INTO `major` VALUES (9, 4, '化学工程与工艺');
INSERT INTO `major` VALUES (10, 4, '化学');
INSERT INTO `major` VALUES (11, 4, '应用化学');
INSERT INTO `major` VALUES (12, 5, '机械设计制造及其自动化');
INSERT INTO `major` VALUES (13, 5, '机械类');
INSERT INTO `major` VALUES (14, 5, '智能制造工程');
INSERT INTO `major` VALUES (15, 6, '电气工程及其自动化');
INSERT INTO `major` VALUES (16, 6, '自动化');
INSERT INTO `major` VALUES (17, 6, '测控技术与仪器');
INSERT INTO `major` VALUES (18, 6, '轨道交通信号与控制');
INSERT INTO `major` VALUES (19, 7, '计算机科学与技术');
INSERT INTO `major` VALUES (20, 7, '电子信息工程');
INSERT INTO `major` VALUES (21, 7, '通信工程');
INSERT INTO `major` VALUES (22, 7, '物联网工程（合作办学）');
INSERT INTO `major` VALUES (23, 7, '空间信息与数字技术');
INSERT INTO `major` VALUES (24, 8, '建筑学');
INSERT INTO `major` VALUES (25, 8, '土木工程');
INSERT INTO `major` VALUES (26, 8, '工程管理');
INSERT INTO `major` VALUES (27, 8, '建筑环境与能源应用工程');
INSERT INTO `major` VALUES (28, 8, '道路桥梁与渡河工程');
INSERT INTO `major` VALUES (29, 8, '交通工程');
INSERT INTO `major` VALUES (30, 9, '数学与应用数学');
INSERT INTO `major` VALUES (31, 9, '应用统计学');
INSERT INTO `major` VALUES (32, 9, '应用物理学');
INSERT INTO `major` VALUES (33, 10, '材料科学与工程');
INSERT INTO `major` VALUES (34, 10, '高分子材料与工程');
INSERT INTO `major` VALUES (35, 10, '无机非金属材料工程');
INSERT INTO `major` VALUES (36, 10, '复合材料与工程');
INSERT INTO `major` VALUES (37, 11, '国际经济与贸易');
INSERT INTO `major` VALUES (39, 11, '经济学');
INSERT INTO `major` VALUES (41, 11, '财政学');
INSERT INTO `major` VALUES (43, 11, '金融学');
INSERT INTO `major` VALUES (45, 11, '金融学（大数据金融）');
INSERT INTO `major` VALUES (46, 12, '工商管理');
INSERT INTO `major` VALUES (48, 12, '物流管理');
INSERT INTO `major` VALUES (50, 12, '电子商务');
INSERT INTO `major` VALUES (52, 12, '财务管理');
INSERT INTO `major` VALUES (54, 13, '英语');
INSERT INTO `major` VALUES (56, 13, '翻译');
INSERT INTO `major` VALUES (58, 14, '法学');
INSERT INTO `major` VALUES (60, 15, '网络与新媒体');
INSERT INTO `major` VALUES (64, 15, '播音与主持艺术（艺术类）');
INSERT INTO `major` VALUES (66, 16, '产品设计');
INSERT INTO `major` VALUES (67, 16, '环境设计');
INSERT INTO `major` VALUES (68, 16, '视觉传达设计');
INSERT INTO `major` VALUES (69, 16, '数字媒体艺术');
INSERT INTO `major` VALUES (70, 17, '人工智能');
INSERT INTO `major` VALUES (71, 17, '软件工程');
INSERT INTO `major` VALUES (72, 17, '数据科学与大数据技术');
INSERT INTO `major` VALUES (73, 18, '英国班戈大学市场营销');
INSERT INTO `major` VALUES (75, 18, '英国班戈大学人力资源管理');
INSERT INTO `major` VALUES (77, 18, '英国班戈大学会计学');
INSERT INTO `major` VALUES (79, 18, '英国雷丁大学食品科学与工程');
INSERT INTO `major` VALUES (80, 18, '英国雷丁大学生物技术');
INSERT INTO `major` VALUES (81, 15, '新闻学');
INSERT INTO `major` VALUES (82, 15, '广播电视学');
INSERT INTO `major` VALUES (83, 15, '广告学');

-- ----------------------------
-- Table structure for session
-- ----------------------------
DROP TABLE IF EXISTS `session`;
CREATE TABLE `session`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` varchar(48) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gpa_value` double NULL DEFAULT NULL,
  `verified` tinyint(1) NULL DEFAULT 0,
  `verify_session` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of session
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
