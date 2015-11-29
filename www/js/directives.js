angular.module('app.directives', [])

	.directive('blankDirective', [function () {

	}])

	.directive('resize', function ($window) {

	})

	.directive("onlineList", function ($compile, $ionicScrollDelegate) {
		return {
			link: function (scope, element, attributes) {
				scope.$watch(attributes.userinfo, function (value) {
					if (!value) return;

					update_ss(value, element);
				});

				scope.$watch(attributes.friends, function (value) {
					if (!value) return;

					console.log('friends', value);
				});

				function update_ss(userinfo, element) {
					var start_time = new Date();
					var con = $('<div>');
					var crew_id = 0; //ui.ui_data.crew_id; //TODO: FIX THIS
					var poker_active = 5; //this.poker_active //TODO: FIX THIS;

					this.user_list_links = {};

					var list = $('<div class="list"></div>');

					var vday = false;
					var link = null;
					for (var i = 0; i < userinfo.length; i++) {
						var user = userinfo[i];


						if (user.i == 10) {
							if (!vday) {
								list.append('<span class="ss_span"> | </span>');
								vday = true;
							}

							link = $('<fakelink url="/news/uprofile.php?vday=' + user.n + '" class="vday" ng-click="handle_link($event)">' + user.n + '</fakelink>');

						} else {
							if (vday) {
								list.append('<br>');
								vday = false;
							}

							link = $('<fakelink url="/news/uprofile.php?id=' + user.i + '"' + (user.s ? ' class="' + user.s + '"' : '') + ' ng-click="handle_link($event)">' + user.n + '</fakelink>');

							link.addClass('ss_link');

							if (user.c && user.c == crew_id) {
								link.addClass('crew');
							}
						}

						list.append(link);

						if (i < userinfo.length - 1) {
							list.append('<span class="ss_span"> | </span>');
						}

						this.user_list_links[user.i] = link;
					}

					con.append('<div class="title">' + userinfo.length + ' Members online in the past few minutes:</div>');
					con.append(list);

					var poker = poker_active + ' ' + (poker_active == 1 ? 'Person' : 'People') + ' playing poker';

					con.append('<div class="footer"><fakelink url="/poker/" ng-click="handle_link($event)">' + poker + '</fakelink><span>-</span><fakelink url="/manage/contacts.php" ng-click="handle_link($event)">Edit Your Contacts</fakelink></div>');

					var compiled = $compile(con[0].innerHTML)(scope);
					element.empty();
					element.append(compiled);

					$ionicScrollDelegate.resize();

					console.log('UI SS List: ' + (new Date().getTime() - start_time.getTime()));
				}


			}
		};
	});


