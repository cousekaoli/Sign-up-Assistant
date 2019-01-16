package com.hust.wxback.service;

import com.hust.wxback.entity.User;
import com.hust.wxback.service.support.IBaseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * <p>
 * 用户服务类
 * </p>
 *
 * @author SPPan
 * @since 2016-12-28
 */
public interface IUserService extends IBaseService<User, Integer> {

	/**
	 * 根据用户名查找用户
	 * @param username
	 * @return
	 */
	User findByUserName(String username);

	/**
	 * 增加或者修改用户
	 * @param user
	 */
	void saveOrUpdate(User user);



	/**
	 * 根据关键字获取分页
	 * @param searchText
	 * @param pageRequest
	 * @return
	 */
	Page<User> findAllByLike(String searchText, PageRequest pageRequest);



}
