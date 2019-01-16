package com.hust.wxback.service.impl;

import com.hust.wxback.dao.support.IBaseDao;
import com.hust.wxback.entity.User;
import com.hust.wxback.service.IUserService;
import com.hust.wxback.service.support.impl.BaseServiceImpl;
import com.hust.wxback.common.utils.MD5Utils;
import com.hust.wxback.dao.IUserDao;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * <p>
 * 用户账户表  服务实现类
 * </p>
 *
 * @author SPPan
 * @since 2016-12-28
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User, Integer> implements IUserService {

	@Autowired
	private IUserDao userDao;

	
	@Override
	public IBaseDao<User, Integer> getBaseDao() {
		return this.userDao;
	}

	@Override
	public User findByUserName(String username) {
		return userDao.findByUserName(username);
	}

	@Override
	public void saveOrUpdate(User user) {
		if(user.getId() != null){
			User dbUser = find(user.getId());
			dbUser.setNickName(user.getNickName());
			dbUser.setSex(user.getSex());
			dbUser.setBirthday(user.getBirthday());
			dbUser.setTelephone(user.getTelephone());
			dbUser.setEmail(user.getEmail());
			dbUser.setAddress(user.getAddress());
			dbUser.setLocked(user.getLocked());
			dbUser.setDescription(user.getDescription());
			dbUser.setUpdateTime(new Date());
			update(dbUser);
		}else{
			user.setCreateTime(new Date());
			user.setUpdateTime(new Date());
			user.setDeleteStatus(0);
			user.setPassword(MD5Utils.md5("111111"));
			save(user);
		}
	}
	
	

	@Override
	public void delete(Integer id) {
		User user = find(id);
		Assert.state(!"admin".equals(user.getUserName()),"超级管理员用户不能删除");
		super.delete(id);
	}



	@Override
	public Page<User> findAllByLike(String searchText, PageRequest pageRequest) {
		if(StringUtils.isBlank(searchText)){
			searchText = "";
		}
		Page<User> page = userDao.findAllByNickNameContaining(searchText, pageRequest);
		System.out.println(pageRequest);
		List<User> content = page.getContent();
		System.out.println("page content:");
		for (int i = 0; i < content.size(); i++) {
			System.out.println(content);
		}
		return page;
	}

	
}
